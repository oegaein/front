import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config} */
export default {
	overrides: [
		{
			files: ['**/*.{js,mjs,cjs,jsx}'],
			languageOptions: {
				globals: globals.browser, // 브라우저 전역 변수 설정
			},
			rules: {
				'react/prop-types': 'off', // PropTypes 검사 비활성화
				'react/react-in-jsx-scope': 'off', // JSX 스코프 검사 비활성화
				'prettier/prettier': 'error', // Prettier 오류를 ESLint 오류로 처리
				'no-unused-vars': 'off', // 사용되지 않는 변수 검사 비활성화
			},
		},
	],
	extends: [
		'eslint:recommended', // ESLint 기본 추천 규칙
		pluginReact.configs.recommended, // React 관련 추천 규칙
		pluginJs.configs.recommended, // JavaScript 관련 추천 규칙
		'plugin:prettier/recommended', // Prettier와의 호환성 규칙
	],
	settings: {
		react: {
			version: 'detect', // 사용 중인 React 버전 자동 감지
		},
	},
};
