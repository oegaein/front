import React, {useState, useRef, useEffect} from 'react'

import Header from '@common/header/Header'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import InitialProfile from '@assets/images/initial-profile.svg'
import Camera from '@assets/images/photo-camera.svg'
import Man from '@assets/images/man.svg'
import Woman from '@assets/images/woman.svg'
import Polygon from '@assets/images/Polygon.svg'

//닉네임, 성별, 학번, 생년월일, 전공, MBTI,
// 수면습관, 생활 패턴, 흡연 여부, 청소 주기, 외출 빈도, 소리 민감 정도 
const MyProfileEditPage = () => {
  const ImageInputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(InitialProfile);
  const [info, setInfo] = useState({
		name: '김혁수',
		gender: '남성',
		student_no: '17학번',
		birthday: '1998-03-05',
    major: '지식콘텐츠학부',
		mbti: 'ENFJ',
		sleephabits: '코골이형',
		lifepattern: '',
		smoking: '',
		cleaning_cycle: '',
		outing: '',
		sound_sensitivity: '',
	});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfo(prevInfo => {
      let updatedInfo = {}
      if (type === 'checkbox') {
        updatedInfo = {
          ...prevInfo,
          [name]: checked
          ? [...prevInfo[name], value]
          : prevInfo[name].info(item => item !== value),
        }
      } else {
        updatedInfo = {
          ...prevInfo,
          [name] : value
        }
      }
      return updatedInfo
    })
  }

  const checkEssentialValue = () => {
    const essentialValues = ['name', 'gender', 'student_no', 'birthday']
    essentialValues.forEach(value => {
      if (!info[value]) {
        return false
      }
    })
    return true
  }
  const handleSubmit = () => {
    if (!checkEssentialValue()) {
      alert('필수 항목을 입력해 주세요')
      return
    }
    try {
      console.log(imageUrl)
    } catch (e) {
      console.log(e)
    }
  } 
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    console.log(imageFile)
    if (imageFile) {
      validateImage(imageFile)
    }
  }

  const validateImage = (imageFile) => {
    // 파일 타입 검증
    if (!imageFile.type.match('image.*')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return false
    }

    // 파일 크기 검증 (예: 5MB 이하만 허용)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (imageFile.size > maxSize) {
        alert('파일 크기는 5MB 이하만 업로드 가능합니다.');
        return false
    }

    const reader = new FileReader();
    console.log(reader)
    reader.onload = () => {
        setImageUrl(reader.result);
    };
    reader.onerror = () => {
        alert('파일을 읽는 중 오류가 발생했습니다.');
        return false
    };

    reader.readAsDataURL(imageFile);
  }

  // 이미지를 서버로 업로드하는 함수 (예시이므로 실제 구현 필요)
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('imageFile', imageUrl);

    console.log('이미지 업로드 로직 구현 필요');
  };

  const handleClickUploadImage = () => {
    ImageInputRef.current.click()
  }

  const deleteImage = () => {
    setImageUrl(InitialProfile)
  }
  useEffect(()=> {
    console.log(info)
  }, [info])

  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
					<span>프로필수정</span>
				</Header>
			</div>

      <div className='image-section pt-[47px] pb-[24px] flex flex-col items-center'>
        <div className='image-container relative h-[114px] w-[114px] rounded-[50%] flex items-center justify-center'>
          {/* 프로필 이미지 */}
          <img onerror={`this.onerror=null; this.src=${InitialProfile};`} className={`object-cover rounded-[50%] ${imageUrl === InitialProfile ? 'h-[38px] w-[38px]' : 'w-full h-full'}`} src={imageUrl} alt='initial profile'/>
          <button onClick={handleClickUploadImage} className='camera absolute h-[26px] w-[26px] left-[89px] bottom-[10px] flex items-center justify-center rounded-[50%]'>
            <img src={Camera} alt='camera'/>
            <input
            type="file"
            style={{ display: 'none' }} // 파일 입력을 숨깁니다.
            ref={ImageInputRef}
            onChange={handleImageChange}
            accept="image/*" // 이미지 파일만 선택할 수 있도록 제한합니다.
            />
          </button>
        </div>
        <div className='delete-btn mt-[16px]'>
          <button onClick={deleteImage}>이미지 삭제</button>
        </div>
      </div>
      <div>
        {/* 닉네임 */}
        <div className='info-section'> 
          <h1 className='info-title mb-[16px]'>닉네임 <span className='info-essential'>*</span></h1> 
          <div className='info-text'> 
            <input className='info-input-box w-full h-[58px] px-[15px]' type="text" name="name" value={info.name} onChange={handleChange}/>
          </div> 
        </div> 
        {/* 성별 */} 
        <div className='info-section'>
          <h1 className='info-title flex justify-between items-center mb-[11px]'>
            <div>성별 <span className='info-essential'>*</span></div>
            <button className='open-btn'>공개</button>
          </h1>
          <div className='flex justify-between gap-[13px] h-[107px]'>
            {
              ['여성', '남성'].map(value => (
              <label className={`info-text gender-input w-full flex justify-center items-center ${info.gender === value && 'gender-selected'}`}>
                <input type="radio" name="gender" value={value} checked={info.gender === value} onChange={handleChange} hidden/>
                <div className='flex flex-col'>
                  <img className='h-[32px] w-[32px] mb-[12px]' src={value === '여성' ? Woman : Man}/>
                  {value}
                </div>
              </label> 
              ))
            }
          </div>
        </div>
        {/* 학번 */}
        <div className='info-section'> 
          <h1 className='info-title flex justify-between items-center mb-[11px]'>
            <div>학번 <span className='info-essential'>*</span></div>
            <button className='open-btn'>공개</button>
          </h1>          
          <div className='info-text'> 
            <select className='info-input-box select-input w-full h-[58px]' name="student_no" onChange={handleChange}>
              {["24학번", '23학번', '22학번', '21학번', '20학번', '19학번', '18학번', '17학번'].map(value => (
                <option value={value} selected={info.student_no === value}>{value}</option>
              ))}
            </select>
          </div> 
        </div> 
        {/* 생년월일 */}
        <div className='info-section'> 
          <h1 className='info-title flex justify-between items-center mb-[11px]'>
            <div>생년월일 <span className='info-essential'>*</span></div>
            <button className='open-btn'>공개</button>
          </h1>          
          <div className='info-text'> 
            <input className='info-input-box w-full h-[58px]' type="date" name="birthday" value={info.birthday} onChange={handleChange}/>
          </div> 
        </div> 
        {/* 전공 */}
        <div className='info-section'> 
          <h1 className='info-title flex justify-between items-center mb-[11px]'>
            전공
            <button className='open-btn'>공개</button>
          </h1>          
          <div className='info-text'> 
            <select className='info-input-box select-input w-full h-[58px]' name="major" onChange={handleChange}>
              {["지식콘텐츠학부", '언어인지과학과', '철학과', '사학과',
              '국제금융학부', 'GBT'].map(value => (
                <option value={value} selected={info.major === value}>{value}</option>
              ))}
            </select>
          </div> 
        </div>
      </div>
      <div className='hr'></div>
      <div className='pt-[25px]'>
        {/* MBTI */}
        <div className='info-section'> 
          <h1 className='info-title flex justify-between items-center mb-[11px]'>
            MBTI
            <button className='open-btn'>공개</button>
          </h1>          
          <div className='info-text'> 
            <select className='info-input-box select-input w-full h-[58px]' name="mjor" onChange={handleChange}>
              {['ISTJ', 'ISTP', 'INFJ', 'INTJ', 'ISFJ', 'ISFP', 'INFP', 'INTP',
                'ESTJ', 'ESFP', 'ENFP', 'ENTP', 'ESFJ', 'ESTP', 'ENFJ', 'ENTJ'].map(value => (
                <option value={value} selected={info.mbti === value}>{value}</option>
              ))}
            </select>
          </div> 
        </div>

        {/* 수면 습관 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>수면 습관</h1>
          <div className='flex flex-wrap content-between h-[84px]'>
            {['코골이형', '이갈이형', '잠꼬대형', '무소음형'].map(sleephabits => (
              <label key={sleephabits} className={`info-input ${info.sleephabits === sleephabits && 'selected'}`}>
                <input type="radio" name="sleephabits" value={sleephabits} checked={info.sleephabits === sleephabits} onChange={handleChange} hidden/> 
                {sleephabits}
              </label>
            ))}
          </div>
        </div>
        {/* 생활 패턴 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>생활 패턴</h1>
          <div className='flex'>
            {['아침형', '저녁형'].map(lifepattern => (
              <label className={`info-input ${info.lifepattern === lifepattern && 'selected'}`}><input type="radio" name="lifepattern" value={lifepattern} checked={info.lifepattern === lifepattern} onChange={handleChange} hidden/>{lifepattern}</label>
            ))}
          </div>
        </div>

        {/* 흡연 여부 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>흡연 여부</h1>
          <div className='flex'>
            {['흡연', '비흡연'].map(smoking => (
              <label className={`info-input ${info.smoking === smoking && 'selected'}`}><input type="radio" name="smoking" value={smoking} checked={info.smoking === smoking} onChange={handleChange} hidden/>{smoking}</label>
            ))}
          </div>
        </div>

        {/* 청소 주기 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>청소 주기</h1>
          <div className='flex flex-wrap content-between h-[84px]'>
            {['매일', '주 1회 이상', '월 1회 이상', '생각날 때 가끔'].map(cleaning_cycle => (
              <label className={`info-input ${info.cleaning_cycle === cleaning_cycle && 'selected'}`}><input type="radio" name="cleaning_cycle" value={cleaning_cycle} checked={info.cleaning_cycle === cleaning_cycle} onChange={handleChange} hidden/>{cleaning_cycle}</label>
            ))}
          </div>
        </div>

        {/* 외출 빈도 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>외출 빈도</h1>
          <div className='flex'>
            {['집순이', '밖순이'].map(outing => (
              <label className={`info-input ${info.outing === outing && 'selected'}`}><input type="radio" name="outing" value={outing} checked={info.outing === outing} onChange={handleChange} hidden/>{outing}</label>
            ))}
          </div>
        </div>

        {/* 소리 민감 정도 */}
        <div className='info-section'>
          <h1 className='info-title mb-[16px]'>소리 민감 정도</h1>
          <div className='flex'>
            {['예민한편', '둔감한편'].map(sound_sensitivity => (
              <label className={`info-input ${info.sound_sensitivity === sound_sensitivity && 'selected'}`}><input type="radio" name="sound_sensitivity" value={sound_sensitivity} checked={info.sound_sensitivity === sound_sensitivity} onChange={handleChange} hidden/>{sound_sensitivity}</label>
            ))}
          </div>
        </div>
      </div>
      <div className='flex items-start justify-between pb-[25px] px-[25px]'>
        <button onClick={handleSubmit} className='submit-btn'>완료</button>
      </div>
    </SettingStyle>
  )
}

export default MyProfileEditPage

const SettingStyle = styled.main`
  .image-section {
    border-top: 1px solid ${COLOR.gray100};
  }
  .image-container {
    background-color: ${COLOR.purple3};
  }
  .info-essential {
    color: ${COLOR.red};
  }
  .select-input {
    appearance: none;
    background: url(${Polygon}) no-repeat right 15px center;
    background-size: 10px;
  }
  .camera {
    border: 1px solid white;
    background-color: ${COLOR.purple2};
  }
  .delete-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .info-section {
    padding: 0 25px;
    padding-bottom: 24px;
  }
  .info-title {
    font-size: ${FONT.title3SB17};
    text-align: left;
  }
  .info-text {
    font-size: ${FONT.body5M15};
  }
  .info-input-box {
    padding: 0 15px;
    border: 1px solid ${COLOR.gray100};
    border-radius: 10px;
  }
  .gender-input {
    border: 1px solid ${COLOR.gray100};
    border-radius: 10px;
  }
  .gender-selected {
    background-color: ${COLOR.purple3};
  }
  .open-btn {
    height: 28px;
    padding: 0 14px;
    font-size: ${FONT.caption2M14};
    border-radius: 5px;
    background-color: ${COLOR.purple3};
    &.open {
      background-color: ${COLOR.purple2};
    }
  }
  .hr {
    height: 10px;
    background-color: ${COLOR.gray50};
  }
  .info-input {
    background-color: white;
    position: relative;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 6px 20px;
    border: 1px solid ${COLOR.gray100};
    border-radius: 15px;
    font-size: ${FONT.body5M15};
    color: ${COLOR.gray600};
    &.selected {
      background-color: ${COLOR.purple2};
      border-color: ${COLOR.purple2};
      color: black;
    }
  }
  .submit-btn {
    font-size: ${FONT.buttonSB15};
    color: white;
    background-color: ${COLOR.purple1};
    height: 52px;
    border-radius: 10px;
    width: 100%;
  }
`