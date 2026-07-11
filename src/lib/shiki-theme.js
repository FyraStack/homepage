export const fyraStackCodeTheme = {
	name: 'fyra-stack-dark',
	type: 'dark',
	colors: {
		'editor.background': '#09090b',
		'editor.foreground': '#e4e4e7'
	},
	tokenColors: [
		{
			scope: ['source', 'text'],
			settings: {
				foreground: '#e4e4e7'
			}
		},
		{
			scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
			settings: {
				fontStyle: 'italic',
				foreground: '#a2a2a9'
			}
		},
		{
			scope: ['punctuation', 'meta.brace', 'meta.delimiter', 'keyword.operator'],
			settings: {
				foreground: '#d5d5d7'
			}
		},
		{
			scope: [
				'constant',
				'constant.numeric',
				'constant.language',
				'constant.character',
				'entity.name.tag',
				'entity.other.attribute-name',
				'support.constant',
				'variable.other.constant'
			],
			settings: {
				foreground: '#e8c98a'
			}
		},
		{
			scope: [
				'string',
				'string.quoted',
				'string.regexp',
				'entity.name.selector',
				'markup.inserted',
				'support.type',
				'support.class',
				'support.variable'
			],
			settings: {
				foreground: '#87c3a0'
			}
		},
		{
			scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
			settings: {
				foreground: '#d89894'
			}
		},
		{
			scope: [
				'entity.name.function',
				'support.function',
				'variable.function',
				'entity.name.type',
				'entity.name.class',
				'support.type.property-name'
			],
			settings: {
				foreground: '#a5c8e8'
			}
		},
		{
			scope: ['variable', 'variable.parameter', 'markup.changed', 'markup.deleted'],
			settings: {
				foreground: '#e8c98a'
			}
		},
		{
			scope: ['markup.bold'],
			settings: {
				fontStyle: 'bold'
			}
		},
		{
			scope: ['markup.italic'],
			settings: {
				fontStyle: 'italic'
			}
		}
	]
};
