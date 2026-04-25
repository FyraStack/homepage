import config from 'ultracite/stylelint';

export default {
	...config,
	extends: [...config.extends, 'stylelint-config-html'],
	ignoreFiles: ['**/*', '!**/*.css', '!**/*.html', '!**/*.svelte', '!**/*.svx'],
	rules: {
		...config.rules,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'variants',
					'responsive',
					'screen',
					'source',
					'reference',
					'plugin',
					'theme',
					'custom-variant'
				]
			}
		],
		'import-notation': null
	},
	overrides: [
		{
			files: ['**/*.html', '**/*.svelte', '**/*.svx'],
			customSyntax: 'postcss-html',
			rules: {
				'no-invalid-position-declaration': null
			}
		}
	]
};
