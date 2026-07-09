import { code_highlighter } from 'mdsvex';

/** @param {string} value */
function escapeCode(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replace(/[{}]/g, (character) => (character === '{' ? '&#123;' : '&#125;'))
		.replaceAll('`', '&#96;')
		.replace(/\\([trn])/g, '&#92;$1');
}

/**
 * @param {string} className
 * @param {string} value
 */
function token(className, value) {
	return `<span class="token ${className}">${escapeCode(value)}</span>`;
}

/** @param {string} value */
function highlightSshConfigValue(value) {
	if (/^(?:accept-new|ask|confirm|no|off|on|yes)$/i.test(value)) {
		return token('boolean', value);
	}

	if (/^\d+$/.test(value)) {
		return token('number', value);
	}

	if (/^(?:~|\/|[A-Za-z]:\\|\w+@|[-\w.]+$)/.test(value)) {
		return token('string', value);
	}

	return escapeCode(value);
}

/** @param {string} line */
function highlightSshConfigLine(line) {
	const indentation = line.match(/^\s*/)?.[0] ?? '';
	const content = line.slice(indentation.length);

	if (!content) {
		return escapeCode(line);
	}

	if (content.startsWith('#')) {
		return escapeCode(indentation) + token('comment', content);
	}

	const directiveMatch = content.match(/^(\S+)(.*)$/);

	if (!directiveMatch) {
		return escapeCode(line);
	}

	const [, directive, suffix] = directiveMatch;
	const directiveClass = /^(?:Host|Match)$/i.test(directive) ? 'keyword' : 'property';
	const commentMatch = suffix.match(/(\s+#.*)$/);
	const values = commentMatch ? suffix.slice(0, -commentMatch[0].length) : suffix;
	const comment = commentMatch?.[0] ?? '';
	const highlightedValues = values.replace(/\S+/g, highlightSshConfigValue);

	return `${escapeCode(indentation)}${token(directiveClass, directive)}${highlightedValues}${comment ? token('comment', comment) : ''}`;
}

/**
 * @param {string} code
 * @param {string | null | undefined} lang
 */
function highlightSshConfig(code, lang) {
	const highlighted = code.split('\n').map(highlightSshConfigLine).join('\n');
	const language = lang?.toLowerCase() || 'sshconfig';

	return `<pre class="language-${language}">{@html \`<code class="language-${language}">${highlighted}</code>\`}</pre>`;
}

/**
 * @param {string} code
 * @param {string | null | undefined} lang
 * @param {string | null | undefined} metastring
 * @param {string | undefined} filename
 * @param {boolean | undefined} optimise
 */
export async function codeCopyHighlighter(code, lang, metastring, filename, optimise) {
	const normalizedLang = lang?.toLowerCase();
	const highlighted =
		normalizedLang === 'sshconfig' || normalizedLang === 'ssh-config'
			? highlightSshConfig(code, normalizedLang)
			: await code_highlighter(code, lang, metastring, filename, optimise);

	return `<div class="docs-code-block">${highlighted}<button class="docs-code-copy-button" type="button" aria-label="Copy code to clipboard">Copy</button></div>`;
}
