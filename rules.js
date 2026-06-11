document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('[data-rules-app]')
	const titleNode = document.querySelector('[data-page-title]')
	const sectionsNode = document.querySelector('[data-sections]')
	const statusNode = document.querySelector('[data-status]')
	const languageToggle = document.querySelector('[data-language-toggle]')
	const backLink = document.querySelector('[data-back-link]')
	if (!app || !titleNode || !sectionsNode || !statusNode || !languageToggle || !backLink) {
		return
	}

	const LANGUAGE_STORAGE_KEY = 'malangenommen.language'
	const PAGE_TRANSITION_STORAGE_KEY = 'malangenommen.pageTransition'
	const RULES_CONTACT_EMAIL = 'l_kuhl@icloud.com'
	const PAGE_TRANSITION_MS = 520
	const state = {
		language: 'de',
		content: null
	}

	const normalizeLanguage = (value) => (value === 'en' ? 'en' : 'de')

	const prefersReducedMotion = () => {
		return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	}

	const applyPageEntryTransition = () => {
		let transitionSource = ''
		try {
			transitionSource = window.sessionStorage.getItem(PAGE_TRANSITION_STORAGE_KEY) || ''
			window.sessionStorage.removeItem(PAGE_TRANSITION_STORAGE_KEY)
		} catch (error) {
			transitionSource = ''
		}
		if (transitionSource !== 'from-game' || prefersReducedMotion()) {
			return
		}
		app.classList.add('is-page-entering-from-game')
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				app.classList.remove('is-page-entering-from-game')
			})
		})
	}

	const navigateWithPageTransition = (event) => {
		if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || backLink.target || prefersReducedMotion()) {
			return
		}
		event.preventDefault()
		try {
			window.sessionStorage.setItem(PAGE_TRANSITION_STORAGE_KEY, 'from-rules')
		} catch (error) {
			// Navigation still works without the destination entry transition.
		}
		app.classList.add('is-page-exiting-to-game')
		window.setTimeout(() => {
			window.location.href = backLink.href
		}, PAGE_TRANSITION_MS)
	}

	const loadStoredLanguage = () => {
		try {
			return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY))
		} catch (error) {
			return 'de'
		}
	}

	const persistLanguage = () => {
		try {
			window.localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language)
		} catch (error) {
			console.warn('Language preference could not be saved.', error)
		}
	}

	const t = (entry) => {
		if (!entry || typeof entry !== 'object') {
			return ''
		}
		if (state.language === 'en') {
			return String(entry.en || entry.de || '')
		}
		return String(entry.de || entry.en || '')
	}

	const appendFormattedText = (parent, value) => {
		const text = String(value || '')
		const pattern = /(\*\*\*([\s\S]+?)\*\*\*|\*\*([\s\S]+?)\*\*|\*([\s\S]+?)\*)/g
		let lastIndex = 0
		let match = pattern.exec(text)
		while (match) {
			if (match.index > lastIndex) {
				parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
			}
			if (match[2]) {
				const strong = document.createElement('strong')
				const em = document.createElement('em')
				em.textContent = match[2]
				strong.appendChild(em)
				parent.appendChild(strong)
			} else if (match[3]) {
				const strong = document.createElement('strong')
				strong.textContent = match[3]
				parent.appendChild(strong)
			} else if (match[4]) {
				const em = document.createElement('em')
				em.textContent = match[4]
				parent.appendChild(em)
			}
			lastIndex = pattern.lastIndex
			match = pattern.exec(text)
		}
		if (lastIndex < text.length) {
			parent.appendChild(document.createTextNode(text.slice(lastIndex)))
		}
	}

	const createContactLink = () => {
		const link = document.createElement('a')
		link.className = 'rules-page__contact-link'
		link.href = `mailto:${RULES_CONTACT_EMAIL}`
		link.textContent = RULES_CONTACT_EMAIL
		return link
	}

	const clearSections = () => {
		sectionsNode.innerHTML = ''
	}

	const renderSectionBlock = (block) => {
		if (!block || typeof block !== 'object') {
			return null
		}
		if (block.type === 'list' && block.items && typeof block.items === 'object') {
			const items = state.language === 'en' ? block.items.en || block.items.de : block.items.de || block.items.en
			if (!Array.isArray(items) || items.length === 0) {
				return null
			}
			const list = document.createElement('ul')
			list.className = 'rules-page__list'
			items.forEach((item) => {
				const li = document.createElement('li')
				appendFormattedText(li, item)
				list.appendChild(li)
			})
			return list
		}

		const paragraph = document.createElement('p')
		paragraph.className = 'rules-page__paragraph'
		appendFormattedText(paragraph, t(block))
		return paragraph
	}

	const renderContent = () => {
		if (!state.content) {
			return
		}

		document.documentElement.lang = state.language
		titleNode.textContent = t(state.content.pageTitle)
		backLink.textContent = state.language === 'en' ? 'Back' : 'Zurück'
		backLink.setAttribute('aria-label', state.language === 'en' ? 'Back to game' : 'Zurück zum Spiel')
		languageToggle.setAttribute('aria-pressed', state.language === 'en' ? 'true' : 'false')
		languageToggle.classList.toggle('is-active', state.language === 'en')

		const img = languageToggle.querySelector('img')
		if (img) {
			img.src = state.language === 'de' ? 'Media/Icons/German.webp' : 'Media/Icons/English.gif'
			img.alt = state.language === 'de' ? 'Deutsch' : 'English'
		}

		clearSections()
		const sections = Array.isArray(state.content.sections) ? state.content.sections : []
		sections.forEach((section) => {
			const article = document.createElement('article')
			article.className = 'rules-page__section'
			if (section.id) {
				article.id = String(section.id)
			}

			const heading = document.createElement('h2')
			heading.className = 'rules-page__heading'
			heading.textContent = t(section.title)
			article.appendChild(heading)

			const blocks = Array.isArray(section.blocks) ? section.blocks : []
			blocks.forEach((block) => {
				const node = renderSectionBlock(block)
				if (node) {
					article.appendChild(node)
				}
			})

			sectionsNode.appendChild(article)
		})
		sectionsNode.appendChild(createContactLink())
	}

	const getContent = async () => {
		const response = await fetch('rules-content.json')
		if (!response.ok) {
			throw new Error('Rules content could not be loaded.')
		}
		return response.json()
	}

	const setErrorState = () => {
		clearSections()
		titleNode.textContent = state.language === 'en' ? 'Rules unavailable' : 'Regeln nicht verfügbar'
		statusNode.hidden = false
		statusNode.textContent = state.language === 'en'
			? 'The rules content could not be loaded. Please try again later.'
			: 'Die Regeln konnten nicht geladen werden. Bitte versuche es später erneut.'
	}

	const toggleLanguage = () => {
		state.language = state.language === 'en' ? 'de' : 'en'
		persistLanguage()
		if (state.content) {
			renderContent()
			statusNode.hidden = true
			statusNode.textContent = ''
			return
		}
		setErrorState()
	}

	const initialize = async () => {
		applyPageEntryTransition()
		state.language = loadStoredLanguage()
		try {
			state.content = await getContent()
			statusNode.hidden = true
			statusNode.textContent = ''
			renderContent()
		} catch (error) {
			console.error(error)
			setErrorState()
		}
	}

	languageToggle.addEventListener('click', toggleLanguage)
	backLink.addEventListener('click', navigateWithPageTransition)
	initialize()
})
