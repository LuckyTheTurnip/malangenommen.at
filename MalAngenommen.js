document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('[data-app]')
	const activeCard = document.querySelector('[data-active-card]')
	const bgCurrentNode = document.querySelector('[data-bg-current]')
	const bgNextNode = document.querySelector('[data-bg-next]')
	const loadingIndicatorNode = document.querySelector('[data-loading-indicator]')
	const frontQuestionNode = activeCard ? activeCard.querySelector('[data-front-question]') : null
	const frontQuestionShellNode = frontQuestionNode ? frontQuestionNode.closest('.card-question-shell') : null
	const kombiWordsNode = activeCard ? activeCard.querySelector('[data-kombi-words]') : null
	const kombiWordOneNode = activeCard ? activeCard.querySelector('[data-kombi-word-1]') : null
	const kombiWordTwoNode = activeCard ? activeCard.querySelector('[data-kombi-word-2]') : null
	const backQuestionNode = activeCard ? activeCard.querySelector('[data-back-question]') : null
	const cardBackLogoNode = activeCard ? activeCard.querySelector('.card-back-logo') : null
	const cardBackOrbitTextNodes = activeCard ? Array.from(activeCard.querySelectorAll('.card-back-orbit-text textPath')) : []
	const flipCueNode = activeCard ? activeCard.querySelector('[data-flip-cue]') : null
	const swipeUpCueNode = activeCard ? activeCard.querySelector('[data-swipe-up-cue]') : null
	const variationCardNode = document.querySelector('[data-variation-card]')
	const variationFanNode = document.querySelector('[data-variation-fan]')
	const variationTextNode = document.querySelector('[data-variation-text]')
	const variationScratchNode = document.querySelector('[data-variation-scratch]')
	const questionNode = frontQuestionNode || backQuestionNode || document.querySelector('[data-question]')
	const categoryLabel = activeCard ? activeCard.querySelector('[data-category-label]') : document.querySelector('[data-category-label]')
	const answerComposerNode = activeCard ? activeCard.querySelector('[data-answer-composer]') : null
	const answerToggleNode = activeCard ? activeCard.querySelector('[data-answer-toggle]') : null
	const answerFormNode = activeCard ? activeCard.querySelector('[data-answer-form]') : null
	const answerUsernameNode = activeCard ? activeCard.querySelector('[data-answer-username]') : null
	const answerTextNode = activeCard ? activeCard.querySelector('[data-answer-text]') : null
	const answerSubmitNode = activeCard ? activeCard.querySelector('[data-answer-submit]') : null
	const answerCancelNode = activeCard ? activeCard.querySelector('[data-answer-cancel]') : null
	const answerStatusNode = activeCard ? activeCard.querySelector('[data-answer-status]') : null
	const answerNameLabelNode = activeCard ? activeCard.querySelector('[data-answer-name-label]') : null
	const answerTextLabelNode = activeCard ? activeCard.querySelector('[data-answer-text-label]') : null
	const answerLeaderboardNode = document.querySelector('[data-answer-leaderboard]')
	const answerLeaderboardTitleNode = document.querySelector('[data-answer-leaderboard-title]')
	const answerLeaderboardCountNode = document.querySelector('[data-answer-leaderboard-count]')
	const answerLeaderboardListNode = document.querySelector('[data-answer-leaderboard-list]')
	const answerLeaderboardEmptyNode = document.querySelector('[data-answer-leaderboard-empty]')
	const answerLeaderboardToggleNode = document.querySelector('[data-answer-leaderboard-toggle]')
	
	const motionToggle = document.querySelector('[data-motion-toggle]')
	const languageToggle = document.querySelector('[data-language-toggle]')
	const filterToggle = document.querySelector('[data-filter-toggle]')
	const filterMenu = document.querySelector('[data-filter-menu]')
	const rulesToggle = document.querySelector('[data-rules-toggle]')
	const rulesViewNode = document.querySelector('[data-rules-view]')
	const rulesCloseNode = document.querySelector('[data-rules-close]')
	const rulesTitleNode = document.querySelector('[data-rules-title]')
	const rulesSectionsNode = document.querySelector('[data-rules-sections]')
	const rulesStatusNode = document.querySelector('[data-rules-status]')
	const filterCategoryInputs = Array.from(document.querySelectorAll('[data-filter-category]'))
	const filterVariationsOnlyInput = document.querySelector('[data-filter-variations-only]')
	const statusNode = document.querySelector('[data-status]')
	const stackCards = Array.from(document.querySelectorAll('[data-stack-card]'))

	if (!app || !activeCard || !categoryLabel || !questionNode || stackCards.length === 0) {
		return
	}

	const CATEGORY_STYLES = {
		hypothetical: {
			label: 'Hypothetical',
			className: 'theme-hypothetical',
			text: '#fff9f6',
			logoSrc: 'Media/Logos/hypothetical_logo.GIF',
			coreColor: '#e0b326',
			logoColor: '#e0b326',
			patternSrc: "Media/Patterns/Hypothetical Muster8.svg",
			patternColorA: '#f7e971',
			patternColorB: '#e0b326',
			circleFillColor: '#f7e971',
			questionShellBg: '#fff7cd',
			questionShellText: '#4a3400',
			questionShellBorder: '#b08c00',
			accent: '#ff8a5b',
			accentSoft: 'rgba(255, 138, 91, 0.18)',
			top: 'rgba(38, 23, 31, 0.96)',
			bottom: 'rgba(14, 10, 18, 0.97)'
		},
		showstopper: {
			label: 'Showstopper',
			className: 'theme-showstopper',
			text: '#f4fbff',
			logoSrc: 'Media/Logos/Showstopper_logo.GIF',
			coreColor: '#90af31',
			logoColor: '#90af31',
			patternSrc: "Media/Patterns/Showstopper Muster8.svg",
			patternColorA: '#90af31',
			patternColorB: '#c6d977',
			circleFillColor: '#c6d977',
			questionShellBg: '#f5ffd6',
			questionShellText: '#234200',
			questionShellBorder: '#6f8f19',
			accent: '#6fc4ff',
			accentSoft: 'rgba(111, 196, 255, 0.16)',
			top: 'rgba(17, 28, 44, 0.96)',
			bottom: 'rgba(10, 14, 26, 0.98)'
		},
		kombichaos: {
			label: 'Kombichaos',
			className: 'theme-kombichaos',
			text: '#f7fff1',
			logoSrc: 'Media/Logos/kombichaos_logo.GIF',
			coreColor: '#cd652e',
			logoColor: '#cd652e',
			patternSrc: "Media/Patterns/Kombichaos Muster8.svg",
			patternColorA: '#cd652e',
			patternColorB: '#dda0c4',
			circleFillColor: '#dda0c4',
			questionShellBg: '#ffd7c8',
			questionShellText: '#5a1d00',
			questionShellBorder: '#b34d1f',
			accent: '#9eff7a',
			accentSoft: 'rgba(158, 255, 122, 0.16)',
			top: 'rgba(20, 30, 18, 0.96)',
			bottom: 'rgba(10, 16, 12, 0.98)'
		},
		monkeyspaw: {
			label: 'Monkey’s Paw',
			className: 'theme-monkeyspaw',
			text: '#fff7e9',
			logoSrc: 'Media/Logos/MonkeysPaw_logo.GIF',
			coreColor: '#2f56a8',
			logoColor: '#2f56a8',
			patternSrc: "Media/Patterns/Monkey's Paw Muster8.svg",
			patternColorA: '#2f56a8',
			patternColorB: '#9d87bf',
			circleFillColor: '#9d87bf',
			questionShellBg: '#eee6ff',
			questionShellText: '#18114c',
			questionShellBorder: '#5a45a0',
			accent: '#ffc45c',
			accentSoft: 'rgba(255, 196, 92, 0.16)',
			top: 'rgba(35, 27, 17, 0.96)',
			bottom: 'rgba(15, 11, 7, 0.98)'
		}
		,
		default: {
			label: 'Other',
			className: 'theme-default',
			text: '#111111',
			logoSrc: '',
			coreColor: '#6b6b6b',
			logoColor: '#6b6b6b',
			patternSrc: '',
			patternColorA: '#f0f0f0',
			patternColorB: '#d0d0d0',
			circleFillColor: '#d0d0d0',
			questionShellBg: '#ffffff',
			questionShellText: '#111111',
			questionShellBorder: '#e0e0e0',
			accent: '#8a8a8a',
			accentSoft: 'rgba(138, 138, 138, 0.12)',
			top: 'rgba(24,24,24,0.9)',
			bottom: 'rgba(10,10,10,0.9)'
		}
	}

	const state = {
		cards: [],
		currentCard: null,
		drawPile: [],
		language: 'de',
		isAnimating: false,
		isDragging: false,
		isMotionEnabled: false,
		isMotionSuspended: false,
		spawnMotionMode: 'on',
		motionPermissionState: 'idle',
		isFlipped: false,
		motionBaselineBeta: null,
		motionBaselineGamma: null,
		motionBaselinePending: false,
		motionActivatedAt: 0,
		lastOrientationBeta: null,
		lastOrientationGamma: null,
		filteredOrientationBeta: null,
		filteredOrientationGamma: null,
		previousOrientationBeta: null,
		previousOrientationGamma: null,
		previousOrientationTimestamp: 0,
		orientationBetaWindow: [],
		orientationGammaWindow: [],
		motionSignalActive: false,
		motionFrameId: 0,
		motionTargetIntent: 0,
		motionTargets: {
			motionX: 0,
			motionY: 0,
			tiltX: 0,
			tiltY: 0,
			tiltZ: 0
		},
		touchStartX: 0,
		touchStartY: 0,
		lastTouchY: 0,
		lastTouchX: 0,
		touchStartTime: 0,
		dragOffsetX: 0,
		dragOffsetY: 0,
		motionX: 0,
		motionY: 0,
		tiltX: 0,
			tiltY: 0,
			tiltZ: 0,
			flipRotationDeg: 0,
			hasFlippedCardOnce: false,
			hasSwipedUpOnce: false,
			hasVariations: false,
			miniCardOpen: false,
			scratchRevealed: false,
			currentVariationText: '',
			activeVariationIndex: -1,
			variationChoices: [],
			variationSketch: null,
			variationScratchCleanup: null,
			canDismissVariation: false,
			variationDismissStartX: 0,
			variationDismissStartY: 0,
			variationTeaserDragging: false,
			variationTeaserDragStartX: 0,
			variationTeaserDragStartY: 0,
			variationTeaserDragX: 0,
			variationTeaserDragY: 0,
			variationTeaserDragProgress: 0,
			variationTeaserPointerId: null,
			variationTeaserSuppressClick: false,
			variationTeaserSuppressClickTimer: null,
			answerComposerOpen: false,
			answerSuccessTimer: null,
			answerLeaderboardOpen: false,
			answerHistory: [],
			leaderboardParallaxFrame: 0,
			rulesOpen: false,
			rulesContent: null,
			rulesLoading: false,
			enabledCategories: new Set(['hypothetical', 'showstopper', 'kombichaos', 'monkeyspaw']),
			variationsOnly: false,
			filterMenuOpen: false,
			fitFrame: 0
			,flipCueTimer: null
			,swipeUpCueTimer: null
			,enterAnimationActive: false
			,spawnAnimationTimer: null
			,currentBackgroundCategoryKey: null
			,isBgTransitioning: false
			,bgTransitionTimer: null
		}

	const SWIPE_DISTANCE = 88
	const SWIPE_RATIO = 1.2
	const SWIPE_VELOCITY = 0.72
	const FLIP_CUE_DELAY_MS = 5000
	const SWIPE_UP_CUE_DELAY_MS = 15000
	const VARIATION_SCRATCH_THRESHOLD = 0.5
	const VARIATION_DISMISS_DISTANCE = 64
	const VARIATION_FLY_MS = 420
	const VARIATION_DRAG_SNAP_PROGRESS = 0.35
	const VARIATION_DRAG_OPEN_DISTANCE = 160
	const VARIATION_DRAG_SNAP_CENTER_RATIO = 0.24
	const VARIATION_DRAG_DEADZONE = 8
	const SCRATCH_GRAIN_DOT_COUNT = 9600
	const SCRATCH_GRAIN_FLAKE_COUNT = 540
	const SPAWN_MOTION_STORAGE_KEY = 'malangenommen.spawnMotionMode'
	const LANGUAGE_STORAGE_KEY = 'malangenommen.language'
	const GAME_SESSION_STORAGE_KEY = 'malangenommen.gameSession'
	const ANSWER_STORAGE_KEY = 'malangenommen.answers'
	const ANSWER_SUBMISSION_ENDPOINT = '/submission'
	const API_BASE = 'https://myfirstapi-slcb.onrender.com/api/v2/views'
	const PAGE_TRANSITION_STORAGE_KEY = 'malangenommen.pageTransition'
	const PAGE_TRANSITION_MS = 520
	const MAX_DRAG_ROTATION = 6
	const MAX_TILT_X = 52
	const MAX_TILT_Y = 52
	const MAX_TILT_Z = 6.5
	const MAX_MOTION_X = 28
	const MAX_MOTION_Y = 30
	const TILT_DAMPING = 0.27
	const ORIENTATION_MOTION_X_DAMPING = 0.5
	const ORIENTATION_MOTION_Y_DAMPING = 0.5
	const ORIENTATION_TILT_X_DAMPING = 0.44
	const ORIENTATION_TILT_Y_DAMPING = 0.4
	const TILT_Z_DAMPING = 0.032
	const MOTION_DEADZONE = 0.7
	const TILT_DEADZONE = 0.6
	const MAX_MOTION_STEP_IDLE = 0.7
	const MAX_MOTION_STEP_ACTIVE = 1.5
	const MAX_TILT_STEP_IDLE = 0.56
	const MAX_TILT_STEP_ACTIVE = 1.3
	const MOTION_SMOOTHING_IDLE = 0.09
	const MOTION_SMOOTHING_ACTIVE = 0.34
	const ORIENTATION_FILTER_ALPHA = 0.26
	const ORIENTATION_SPIKE_CAP_DEG = 5.5
	const ORIENTATION_MEDIAN_WINDOW = 5
	const MOTION_ACTIVITY_ON = 0.56
	const MOTION_ACTIVITY_OFF = 0.3
	const MOTION_BASELINE_ACTIVITY_FACTOR = 0.06
	const SHINE_SHIFT_X_MAX = 38
	const SHINE_SHIFT_Y_MAX = 32
	const FACET_TEX_WIDTH = 512
	const FACET_TEX_HEIGHT = 640
	const FACET_POLYGON_COUNT = 10000
	const VARIATION_VISUALS = [
		{ patternSrc: 'Media/Patterns/Variation Muster_18.svg', colorA: '#8b64a9', colorB: '#bda8cf' },
		{ patternSrc: 'Media/Patterns/Variation Muster_28.svg', colorA: '#d065a5', colorB: '#dda0c4' },
		{ patternSrc: 'Media/Patterns/Variation Muster_38.svg', colorA: '#a85e8d', colorB: '#b390c0' },
		{ patternSrc: 'Media/Patterns/Variation Muster_48.svg', colorA: '#cde2df', colorB: '#e3b1d0' }
	]
	const AVATAR_IMAGE_SOURCES = []
	const ANSWER_TEXT = {
		de: {
			toggle: 'Eigene Antwort',
			name: 'Name',
			answer: 'Antwort',
			namePlaceholder: 'Gib deinen Namen ein',
			answerPlaceholder: 'Schreib deine Antwort auf die Frage',
			submit: 'Senden',
			submitting: 'Wird gesendet...',
			cancel: 'Schliessen',
			leaderboard: 'Leaderboard',
			showLeaderboard: 'Leaderboard',
			hideLeaderboard: 'Zuruck',
			empty: 'Noch keine Antworten.',
			success: 'Antwort gesendet.',
			error: 'Antwort konnte nicht gesendet werden.',
			countSingular: '1 Antwort',
			countPlural: (count) => `${count} Antworten`
		},
		en: {
			toggle: 'Your answer',
			name: 'Name',
			answer: 'Answer',
			namePlaceholder: 'Enter your name',
			answerPlaceholder: 'Write your answer to the question',
			submit: 'Send',
			submitting: 'Sending...',
			cancel: 'Close',
			leaderboard: 'Leaderboard',
			showLeaderboard: 'Leaderboard',
			hideLeaderboard: 'Close',
			empty: 'No answers yet.',
			success: 'Answer sent.',
			error: 'Answer could not be sent.',
			countSingular: '1 answer',
			countPlural: (count) => `${count} answers`
		}
	}

	const normalizeLanguage = (value) => {
		return value === 'en' ? 'en' : 'de'
	}

	const loadStoredLanguage = () => {
		try {
			const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
			return normalizeLanguage(raw)
		} catch (error) {
			return 'de'
		}
	}

	const persistLanguage = () => {
		try {
			window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguage(state.language))
		} catch (error) {
			console.warn('Spracheinstellung konnte nicht gespeichert werden.', error)
		}
	}

	const getAnswerCopy = () => ANSWER_TEXT[normalizeLanguage(state.language)] || ANSWER_TEXT.de

	const softClamp = (value, max) => {
		return max * Math.tanh(value / max)
	}

	const normalizeCategory = (value) => {
		const raw = String(value || '').trim()
		// remove common apostrophe/quote characters so "Monkey’s Paw" -> "Monkeys Paw"
		const withoutApos = raw.replace(/['’‘`‛\u2019\u2018]+/g, '')
		const normalized = withoutApos
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')

		if (normalized.includes('showstopper')) {
			return 'showstopper'
		}

		if (normalized.includes('kombichaos')) {
			return 'kombichaos'
		}

		// collapse dashes to check variants like "monkey-s-paw" -> "monkeyspaw"
		const condensed = normalized.replace(/-/g, '')
		if (condensed.includes('monkeyspaw') || condensed.includes('mokeyspaw') || condensed.includes('mokeystpaw')) {
			return 'monkeyspaw'
		}

		// if we have a normalized token, use it, otherwise fallback to 'default'
		return normalized || 'default'
	}

	// Read client API key and header name from window globals or meta tags
	const getClientApiKeyAndHeader = () => {
		let key = (typeof window !== 'undefined' && window.APP_API_KEY) ? String(window.APP_API_KEY) : null
		let headerName = (typeof window !== 'undefined' && window.APP_API_KEY_HEADER_NAME) ? String(window.APP_API_KEY_HEADER_NAME) : 'x-api-key'
		try {
			if (!key) {
				const meta = document.querySelector('meta[name="app-api-key"]')
				if (meta && meta.getAttribute) {
					key = String(meta.getAttribute('content') || '') || null
				}
			}
			if (!headerName || headerName === '') {
				const metaHeader = document.querySelector('meta[name="app-api-key-header-name"]')
				if (metaHeader && metaHeader.getAttribute) {
					headerName = String(metaHeader.getAttribute('content') || '') || 'x-api-key'
				}
			}
		} catch (e) {
			// ignore
		}
		return { key, headerName }
	}

	// Fetch history from remote API (returns array of entries)
	const fetchHistoryFromApi = async () => {
		// allow an API key to be provided on the client via window or meta tags
		const { key: apiKey, headerName: apiKeyHeaderName } = getClientApiKeyAndHeader()
		const headers = { 'Content-Type': 'application/json' }
		if (apiKey) headers[apiKeyHeaderName] = apiKey
		try {
			const response = await fetch(`${API_BASE}/history`, { headers })
			if (!response.ok) {
				throw new Error(`History fetch failed with status ${response.status}`)
			}
			const json = await response.json()
			const raw = Array.isArray(json.history) ? json.history : (Array.isArray(json) ? json : [])
			return raw
				.filter((entry) => entry && typeof entry === 'object')
				.map((entry) => ({
					username: String(entry.name || entry.username || ''),
					answer: String(entry.answer || ''),
					createdAt: String(entry.time || entry.createdAt || new Date().toISOString()),
					question: String(entry.question || entry.question_text || '')
				}))
		} catch (error) {
			console.warn('Antwort-Historie konnte nicht geladen werden.', error)
			return []
		}
	}
	
	const createAnswerId = () => {
		if (window.crypto && typeof window.crypto.randomUUID === 'function') {
			return window.crypto.randomUUID()
		}
		return `answer-${Date.now()}-${Math.random().toString(36).slice(2)}`
	}

	const sendAnswerToDatabase = async (payload) => {
		const { key: apiKey, headerName: apiKeyHeaderName } = getClientApiKeyAndHeader()
		const headers = { 'Content-Type': 'application/json' }
		if (apiKey) headers[apiKeyHeaderName] = apiKey
		const response = await fetch(`${API_BASE}${ANSWER_SUBMISSION_ENDPOINT}`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				username: String(payload.username || '').trim(),
				answer: String(payload.answer || '').trim(),
				question: String(payload.question || '')
			})
		})
		if (!response.ok) {
			let detail = ''
			try { detail = await response.text() } catch (e) { /* ignore */ }
			throw new Error(`Answer submission failed with status ${response.status} ${detail}`)
		}
	}

	const createAnswerSubmission = async (payload) => {
		const answer = {
			id: createAnswerId(),
			cardId: String(payload.cardId || ''),
			question: String(payload.question || ''),
			category: String(payload.category || ''),
			username: String(payload.username || '').trim(),
			answer: String(payload.answer || '').trim(),
			createdAt: new Date().toISOString()
		}
		await sendAnswerToDatabase(answer)
		// refresh remote history cache
		try {
			state.answerHistory = await fetchHistoryFromApi()
		} catch (e) {
			state.answerHistory = state.answerHistory || []
		}
		return answer
	}

	const getAnswersForCard = (cardId) => {
		const normalizedCardId = String(cardId || '')
		const raw = Array.isArray(state.answerHistory) ? state.answerHistory : []
		const questionText = (state.currentCard ? getCardQuestion(state.currentCard) : '')
		return raw
			.filter((entry) => {
				if (!entry) return false
				// if entry includes a question and we have a current card question, match by question
				if (entry.question && questionText) {
					return String(entry.question).trim() === String(questionText).trim()
				}
				// if entry includes a cardId, match by cardId
				if (entry.cardId) {
					return String(entry.cardId) === normalizedCardId
				}
				// if history entries have no question/cardId, treat them as global answers and include them
				return !entry.question && !entry.cardId
			})
			.sort((left, right) => String(right.createdAt || '').localeCompare(String(left.createdAt || '')))
	}

	const formatAnswerTime = (createdAt) => {
		const date = new Date(createdAt)
		if (Number.isNaN(date.getTime())) {
			return ''
		}
		try {
			return new Intl.DateTimeFormat(state.language === 'en' ? 'en' : 'de-AT', {
				day: '2-digit',
				month: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			}).format(date)
		} catch (error) {
			return date.toLocaleString()
		}
	}

	const hashString = (value) => {
		const input = String(value || '')
		let hash = 2166136261
		for (let index = 0; index < input.length; index += 1) {
			hash ^= input.charCodeAt(index)
			hash = Math.imul(hash, 16777619)
		}
		return hash >>> 0
	}

	const getAnswerIdentity = (entry, index) => {
		return [
			entry?.id,
			entry?.username,
			entry?.answer,
			entry?.createdAt,
			index
		].filter(Boolean).join('|')
	}

	const getAvatarInitials = (username) => {
		const clean = String(username || '').trim()
		if (!clean) return '?'
		return clean
			.split(/\s+/)
			.slice(0, 2)
			.map((part) => part.charAt(0).toUpperCase())
			.join('')
	}

	const createAvatarNode = (entry, index, copy) => {
		const identity = getAnswerIdentity(entry, index)
		const hash = hashString(identity)
		const avatar = document.createElement('div')
		avatar.className = 'answer-leaderboard__avatar'
		avatar.setAttribute('aria-hidden', 'true')

		if (AVATAR_IMAGE_SOURCES.length > 0) {
			const img = document.createElement('img')
			img.src = AVATAR_IMAGE_SOURCES[hash % AVATAR_IMAGE_SOURCES.length]
			img.alt = ''
			avatar.appendChild(img)
			return avatar
		}

		const hue = hash % 360
		avatar.style.setProperty('--avatar-hue', String(hue))
		avatar.textContent = getAvatarInitials(entry?.username || copy.name)
		return avatar
	}

	const applyMessageVariation = (message, entry, index) => {
		const hash = hashString(getAnswerIdentity(entry, index))
		const randomUnit = (shift) => ((hash >>> shift) & 255) / 255
		const side = message.classList.contains('answer-leaderboard__message--right') ? 1 : -1
		const drift = (randomUnit(0) * 2 - 1) * 42
		const floatDistance = 5 + randomUnit(8) * 8
		const floatDuration = 4.8 + randomUnit(16) * 2.8
		const floatDelay = -randomUnit(24) * floatDuration

		message.style.setProperty('--message-random-x', `${(side * drift).toFixed(1)}px`)
		message.style.setProperty('--message-float-distance', `${floatDistance.toFixed(1)}px`)
		message.style.setProperty('--message-float-duration', `${floatDuration.toFixed(2)}s`)
		message.style.setProperty('--message-float-delay', `${floatDelay.toFixed(2)}s`)
	}

	const updateLeaderboardParallax = () => {
		state.leaderboardParallaxFrame = 0
		if (!answerLeaderboardListNode || !state.answerLeaderboardOpen) {
			return
		}

		const listRect = answerLeaderboardListNode.getBoundingClientRect()
		const centerY = listRect.top + listRect.height / 2
		const maxDistance = Math.max(listRect.height / 2, 1)
		const messages = Array.from(answerLeaderboardListNode.querySelectorAll('.answer-leaderboard__message'))

		messages.forEach((message, index) => {
			const rect = message.getBoundingClientRect()
			const messageCenter = rect.top + rect.height / 2
			const distance = Math.min(Math.abs(messageCenter - centerY) / maxDistance, 1)
			const edgeDistance = Math.max(0, (distance - 0.68) / 0.32)
			const side = message.classList.contains('answer-leaderboard__message--right') ? 1 : -1
			const depth = 1 - distance
			const scale = 0.94 + depth * 0.06
			const blur = edgeDistance * 1.85
			const opacity = 0.78 + (1 - edgeDistance) * 0.22
			const yOffset = (0.5 - depth) * 20
			const xOffset = side * edgeDistance * 10
			const zIndex = Math.round(depth * 100) + index

			message.style.setProperty('--message-scale', scale.toFixed(3))
			message.style.setProperty('--message-blur', `${blur.toFixed(2)}px`)
			message.style.setProperty('--message-opacity', opacity.toFixed(3))
			message.style.setProperty('--message-y', `${yOffset.toFixed(1)}px`)
			message.style.setProperty('--message-x', `${xOffset.toFixed(1)}px`)
			message.style.setProperty('--message-z', String(zIndex))
		})
	}

	const scheduleLeaderboardParallax = () => {
		if (state.leaderboardParallaxFrame || !answerLeaderboardListNode) {
			return
		}
		state.leaderboardParallaxFrame = window.requestAnimationFrame(updateLeaderboardParallax)
	}

	const renderLeaderboard = (cardId) => {
		if (!answerLeaderboardNode || !answerLeaderboardListNode) {
			return
		}
		const copy = getAnswerCopy()
		const answers = getAnswersForCard(cardId)
		if (answerLeaderboardTitleNode) {
			answerLeaderboardTitleNode.textContent = copy.leaderboard
		}
		if (answerLeaderboardCountNode) {
			answerLeaderboardCountNode.textContent = answers.length === 1 ? copy.countSingular : copy.countPlural(answers.length)
		}
		if (answerLeaderboardEmptyNode) {
			answerLeaderboardEmptyNode.textContent = copy.empty
		}
		answerLeaderboardListNode.innerHTML = ''
		if (answers.length === 0) {
			const emptyNode = document.createElement('p')
			emptyNode.className = 'answer-leaderboard__empty'
			emptyNode.textContent = copy.empty
			answerLeaderboardListNode.appendChild(emptyNode)
			scheduleLeaderboardParallax()
			return
		}
		answers.forEach((entry, index) => {
			const item = document.createElement('article')
			item.className = `answer-leaderboard__message answer-leaderboard__message--${index % 2 === 0 ? 'left' : 'right'}`
			applyMessageVariation(item, entry, index)

			const avatar = createAvatarNode(entry, index, copy)
			const bubble = document.createElement('div')
			bubble.className = 'answer-leaderboard__bubble'

			const meta = document.createElement('p')
			meta.className = 'answer-leaderboard__meta'
			const name = document.createElement('strong')
			name.textContent = entry.username || copy.name
			meta.appendChild(name)
			const time = formatAnswerTime(entry.createdAt)
			if (time) {
				const timeNode = document.createElement('span')
				timeNode.textContent = time
				meta.appendChild(timeNode)
			}

			const text = document.createElement('p')
			text.className = 'answer-leaderboard__answer'
			text.textContent = entry.answer || ''

			bubble.appendChild(meta)
			bubble.appendChild(text)
			item.appendChild(avatar)
			item.appendChild(bubble)
			answerLeaderboardListNode.appendChild(item)
		})
		scheduleLeaderboardParallax()
	}

	const translateRulesEntry = (entry) => {
		if (!entry || typeof entry !== 'object') {
			return ''
		}
		if (state.language === 'en') {
			return String(entry.en || entry.de || '')
		}
		return String(entry.de || entry.en || '')
	}

	const clearRulesSections = () => {
		if (rulesSectionsNode) {
			rulesSectionsNode.innerHTML = ''
		}
	}

	const renderRulesBlock = (block) => {
		if (!block || typeof block !== 'object') {
			return null
		}
		if (block.type === 'list' && block.items && typeof block.items === 'object') {
			const items = state.language === 'en' ? block.items.en || block.items.de : block.items.de || block.items.en
			if (!Array.isArray(items) || items.length === 0) {
				return null
			}
			const list = document.createElement('ul')
			list.className = 'rules-view__list'
			items.forEach((item) => {
				const li = document.createElement('li')
				li.textContent = String(item || '')
				list.appendChild(li)
			})
			return list
		}
		const paragraph = document.createElement('p')
		paragraph.className = 'rules-view__paragraph'
		paragraph.textContent = translateRulesEntry(block)
		return paragraph
	}

	const renderRulesContent = () => {
		if (!rulesTitleNode || !rulesSectionsNode || !rulesCloseNode) {
			return
		}
		rulesCloseNode.textContent = state.language === 'en' ? 'Back' : 'Zurück'
		if (rulesToggle) {
			rulesToggle.textContent = state.language === 'en' ? 'Rules' : 'Regeln'
		}
		if (!state.rulesContent) {
			return
		}
		rulesTitleNode.textContent = translateRulesEntry(state.rulesContent.pageTitle)
		clearRulesSections()
		const sections = Array.isArray(state.rulesContent.sections) ? state.rulesContent.sections : []
		sections.forEach((section) => {
			const article = document.createElement('article')
			article.className = 'rules-view__section'
			if (section.id) {
				article.id = `rules-${section.id}`
			}
			const heading = document.createElement('h2')
			heading.className = 'rules-view__heading'
			heading.textContent = translateRulesEntry(section.title)
			article.appendChild(heading)
			const blocks = Array.isArray(section.blocks) ? section.blocks : []
			blocks.forEach((block) => {
				const node = renderRulesBlock(block)
				if (node) {
					article.appendChild(node)
				}
			})
			rulesSectionsNode.appendChild(article)
		})
	}

	const loadRulesContent = async () => {
		if (state.rulesContent || state.rulesLoading) {
			return
		}
		state.rulesLoading = true
		try {
			const response = await fetch('rules-content.json')
			if (!response.ok) {
				throw new Error('Rules content could not be loaded.')
			}
			state.rulesContent = await response.json()
			if (rulesStatusNode) {
				rulesStatusNode.hidden = true
				rulesStatusNode.textContent = ''
			}
			renderRulesContent()
		} catch (error) {
			console.error(error)
			clearRulesSections()
			if (rulesTitleNode) {
				rulesTitleNode.textContent = state.language === 'en' ? 'Rules unavailable' : 'Regeln nicht verfügbar'
			}
			if (rulesStatusNode) {
				rulesStatusNode.hidden = false
				rulesStatusNode.textContent = state.language === 'en'
					? 'The rules content could not be loaded. Please try again later.'
					: 'Die Regeln konnten nicht geladen werden. Bitte versuche es später erneut.'
			}
		} finally {
			state.rulesLoading = false
		}
	}

	const updateRulesVisibility = () => {
		app.classList.toggle('is-rules-view', state.rulesOpen)
		if (rulesViewNode) {
			rulesViewNode.classList.toggle('is-open', state.rulesOpen)
			rulesViewNode.setAttribute('aria-hidden', state.rulesOpen ? 'false' : 'true')
		}
		if (rulesToggle) {
			rulesToggle.classList.toggle('is-active', state.rulesOpen)
			rulesToggle.setAttribute('aria-expanded', state.rulesOpen ? 'true' : 'false')
		}
	}

	const setRulesOpen = async (open) => {
		state.rulesOpen = !!open
		if (state.rulesOpen) {
			setLeaderboardOpen(false)
			updateRulesVisibility()
			await loadRulesContent()
			renderRulesContent()
			return
		}
		updateRulesVisibility()
	}

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
		if (transitionSource !== 'from-rules' || prefersReducedMotion()) {
			return
		}
		app.classList.add('is-page-entering-from-rules')
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				app.classList.remove('is-page-entering-from-rules')
			})
		})
	}

	const navigateWithPageTransition = (event, targetClass, storageValue) => {
		const link = event.currentTarget
		if (!(link instanceof HTMLAnchorElement)) {
			return
		}
		if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || prefersReducedMotion()) {
			return
		}
		event.preventDefault()
		try {
			window.sessionStorage.setItem(PAGE_TRANSITION_STORAGE_KEY, storageValue)
		} catch (error) {
			// Navigation still works without the destination entry transition.
		}
		app.classList.add(targetClass)
		window.setTimeout(() => {
			window.location.href = link.href
		}, PAGE_TRANSITION_MS)
	}

	const parseHexColor = (value) => {
		const normalized = String(value || '').trim()
		const full = normalized.match(/^#([0-9a-f]{6})$/i)
		const short = normalized.match(/^#([0-9a-f]{3})$/i)
		if (full) {
			const hex = full[1]
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16)
			}
		}
		if (short) {
			const hex = short[1]
			return {
				r: parseInt(hex[0] + hex[0], 16),
				g: parseInt(hex[1] + hex[1], 16),
				b: parseInt(hex[2] + hex[2], 16)
			}
		}
		return { r: 12, g: 16, b: 32 }
	}

	const mixRgb = (left, right, ratio) => {
		const t = Math.max(0, Math.min(1, ratio))
		return {
			r: Math.round(left.r + (right.r - left.r) * t),
			g: Math.round(left.g + (right.g - left.g) * t),
			b: Math.round(left.b + (right.b - left.b) * t)
		}
	}

	const scaleRgb = (rgb, factor) => {
		return {
			r: Math.max(0, Math.min(255, Math.round(rgb.r * factor))),
			g: Math.max(0, Math.min(255, Math.round(rgb.g * factor))),
			b: Math.max(0, Math.min(255, Math.round(rgb.b * factor)))
		}
	}

	const rgbToCss = (rgb, alpha = 1) => {
		if (alpha >= 1) {
			return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
		}
		return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
	}

	const deriveBackgroundPalette = (theme) => {
		const colorA = parseHexColor(theme?.patternColorA)
		const colorB = parseHexColor(theme?.patternColorB)
		const blend = mixRgb(colorA, colorB, 0.5)
		const top = scaleRgb(mixRgb(colorA, blend, 0.35), 0.34)
		const bottom = scaleRgb(mixRgb(colorB, blend, 0.62), 0.2)
		const glowA = rgbToCss(scaleRgb(colorA, 0.88), 0.22)
		const glowB = rgbToCss(scaleRgb(colorB, 0.9), 0.18)
		const scene = mixRgb(top, bottom, 0.5)
		const sceneLuma = (0.2126 * scene.r + 0.7152 * scene.g + 0.0722 * scene.b) / 255
		return {
			top: rgbToCss(top),
			bottom: rgbToCss(bottom),
			glowA,
			glowB,
			logoInvert: sceneLuma < 0.46 ? 1 : 0
		}
	}

	const setBackgroundPlaneColors = (targetNode, palette) => {
		if (!targetNode || !palette) {
			return
		}
		targetNode.style.setProperty('--bg-top', palette.top)
		targetNode.style.setProperty('--bg-bottom', palette.bottom)
		targetNode.style.setProperty('--bg-glow-a', palette.glowA)
		targetNode.style.setProperty('--bg-glow-b', palette.glowB)
	}

	const applyCategoryBackground = (categoryKey, options = {}) => {
		if (!bgCurrentNode || !bgNextNode || !app) {
			return
		}
		const theme = CATEGORY_STYLES[categoryKey] || CATEGORY_STYLES.default
		const palette = deriveBackgroundPalette(theme)
		const immediate = !!options.immediate
		const shouldSkip = !immediate && state.currentBackgroundCategoryKey === categoryKey
		if (shouldSkip) {
			return
		}

		if (state.bgTransitionTimer) {
			clearTimeout(state.bgTransitionTimer)
			state.bgTransitionTimer = null
		}

		if (immediate || !state.currentBackgroundCategoryKey) {
			setBackgroundPlaneColors(bgCurrentNode, palette)
			setBackgroundPlaneColors(bgNextNode, palette)
			app.style.setProperty('--brand-logo-invert', String(palette.logoInvert))
			app.classList.remove('is-bg-transitioning')
			state.currentBackgroundCategoryKey = categoryKey
			state.isBgTransitioning = false
			return
		}

		setBackgroundPlaneColors(bgNextNode, palette)
		state.isBgTransitioning = true
		app.classList.add('is-bg-transitioning')
		const finish = () => {
			if (!state.isBgTransitioning) {
				return
			}
			setBackgroundPlaneColors(bgCurrentNode, palette)
			app.style.setProperty('--brand-logo-invert', String(palette.logoInvert))
			app.classList.remove('is-bg-transitioning')
			state.currentBackgroundCategoryKey = categoryKey
			state.isBgTransitioning = false
		}
		state.bgTransitionTimer = window.setTimeout(() => {
			finish()
			state.bgTransitionTimer = null
		}, 1480)
	}

	const applyDeadzone = (value, threshold) => {
		return Math.abs(value) < threshold ? 0 : value
	}

	const stepToward = (current, target, maxStep) => {
		const delta = target - current
		const boundedDelta = Math.max(-maxStep, Math.min(maxStep, delta))
		return current + boundedDelta
	}

	const applySmoothedMotionTargets = (targets, options = {}) => {
		const targetMotionX = applyDeadzone(targets.motionX, MOTION_DEADZONE)
		const targetMotionY = applyDeadzone(targets.motionY, MOTION_DEADZONE)
		const targetTiltX = applyDeadzone(targets.tiltX, TILT_DEADZONE)
		const targetTiltY = applyDeadzone(targets.tiltY, TILT_DEADZONE)
		const targetTiltZ = applyDeadzone(targets.tiltZ, TILT_DEADZONE)

		const intent = Math.max(0, Math.min(1, Number(options.intent ?? 0.7)))
		const smoothing = MOTION_SMOOTHING_IDLE + (MOTION_SMOOTHING_ACTIVE - MOTION_SMOOTHING_IDLE) * intent
		const motionStep = MAX_MOTION_STEP_IDLE + (MAX_MOTION_STEP_ACTIVE - MAX_MOTION_STEP_IDLE) * intent
		const tiltStep = MAX_TILT_STEP_IDLE + (MAX_TILT_STEP_ACTIVE - MAX_TILT_STEP_IDLE) * intent

		const easedMotionX = state.motionX + (targetMotionX - state.motionX) * smoothing
		const easedMotionY = state.motionY + (targetMotionY - state.motionY) * smoothing
		const easedTiltX = state.tiltX + (targetTiltX - state.tiltX) * smoothing
		const easedTiltY = state.tiltY + (targetTiltY - state.tiltY) * smoothing
		const easedTiltZ = state.tiltZ + (targetTiltZ - state.tiltZ) * smoothing

		state.motionX = stepToward(state.motionX, easedMotionX, motionStep)
		state.motionY = stepToward(state.motionY, easedMotionY, motionStep)
		state.tiltX = stepToward(state.tiltX, easedTiltX, tiltStep)
		state.tiltY = stepToward(state.tiltY, easedTiltY, tiltStep)
		state.tiltZ = stepToward(state.tiltZ, easedTiltZ, tiltStep)
		applyMotionTransform()
	}

	const stopMotionLoop = () => {
		if (state.motionFrameId) {
			cancelAnimationFrame(state.motionFrameId)
			state.motionFrameId = 0
		}
	}

	const runMotionLoop = () => {
		if (!state.isMotionEnabled || state.isMotionSuspended) {
			stopMotionLoop()
			return
		}

		applySmoothedMotionTargets(state.motionTargets, { intent: state.motionTargetIntent })
		state.motionFrameId = requestAnimationFrame(runMotionLoop)
	}

	const startMotionLoop = () => {
		if (state.motionFrameId || !state.isMotionEnabled || state.isMotionSuspended) {
			return
		}
		state.motionFrameId = requestAnimationFrame(runMotionLoop)
	}

	const computeMedian = (values) => {
		if (!Array.isArray(values) || values.length === 0) {
			return 0
		}
		const sorted = values.slice().sort((left, right) => left - right)
		const middle = Math.floor(sorted.length / 2)
		if (sorted.length % 2 === 0) {
			return (sorted[middle - 1] + sorted[middle]) / 2
		}
		return sorted[middle]
	}

	const pushMedianSample = (windowValues, value) => {
		windowValues.push(value)
		if (windowValues.length > ORIENTATION_MEDIAN_WINDOW) {
			windowValues.shift()
		}
		return computeMedian(windowValues)
	}

	const clampOrientationSpike = (currentValue, previousValue) => {
		if (!Number.isFinite(currentValue)) {
			return 0
		}
		if (!Number.isFinite(previousValue)) {
			return currentValue
		}
		const delta = currentValue - previousValue
		const boundedDelta = Math.max(-ORIENTATION_SPIKE_CAP_DEG, Math.min(ORIENTATION_SPIKE_CAP_DEG, delta))
		return previousValue + boundedDelta
	}

	const normalizeSpawnMotionMode = (value) => {
		const normalized = String(value || '').toLowerCase()
		if (normalized === 'on' || normalized === 'off') {
			return normalized
		}

		return 'on'
	}

	

	const shuffle = (items) => {
		const next = items.slice()

		for (let index = next.length - 1; index > 0; index -= 1) {
			const swapIndex = Math.floor(Math.random() * (index + 1))
			;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
		}

		return next
	}

	const getRelativeLuminance = (hexColor) => {
		const match = String(hexColor || '').trim().match(/^#([0-9a-f]{6})$/i)
		if (!match) {
			return 1
		}
		const hex = match[1]
		const channels = [
			parseInt(hex.slice(0, 2), 16),
			parseInt(hex.slice(2, 4), 16),
			parseInt(hex.slice(4, 6), 16)
		].map((value) => {
			const srgb = value / 255
			return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
		})
		return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
	}

	const getDarkerHexColor = (first, second) => {
		return getRelativeLuminance(first) <= getRelativeLuminance(second) ? first : second
	}

	const toCards = (rawCards) => {
		const sanitizeVariationList = (value) => {
			if (!Array.isArray(value)) {
				return []
			}

			return value
				.map((entry) => String(entry || '').trim())
				.filter((entry) => entry.length > 0)
		}

		const out = rawCards
			.map((card, index) => {
				const categoryRaw = String(card?.category || '').trim()
				const categoryKey = normalizeCategory(categoryRaw)
				const question = String(card?.question || '').trim()
				const variationsClean = sanitizeVariationList(card?.variations)
				const wordOne = String(card?.word1 || card?.wordOne || card?.Wort1 || card?.wort1 || '').trim()
				const wordTwo = String(card?.word2 || card?.wordTwo || card?.Wort2 || card?.wort2 || '').trim()
				if (!question) return null
				return {
					id: `${categoryKey}-${index}`,
					categoryKey,
					categoryLabel: categoryRaw || (CATEGORY_STYLES[categoryKey] && CATEGORY_STYLES[categoryKey].label) || CATEGORY_STYLES.default.label,
					question,
					wordOne,
					wordTwo,
					variationsClean,
					variationAmount: Number.isFinite(Number(card?.variation_amount)) ? Number(card.variation_amount) : (Array.isArray(card?.variations) ? card.variations.length : 0),
					rawIndex: index
				}
			})
			.filter(Boolean)
		// Ensure any unknown categories get a default style entry in CATEGORY_STYLES
		const unknownCategories = new Set()
		out.forEach((c) => {
			if (!CATEGORY_STYLES[c.categoryKey]) {
				unknownCategories.add(c.categoryKey)
			}
		})
		unknownCategories.forEach((key) => {
			CATEGORY_STYLES[key] = Object.assign({}, CATEGORY_STYLES.default, { label: key.replace(/-/g, ' ') })
		})
		return out
	}

	const getCardQuestion = (card) => {
		if (!card) return ''
		return String(card.question || '').trim()
	}

	const getCardVariations = (card) => {
		if (!card) return []
		// Only return variations if the card explicitly has variationAmount > 0
		const amount = Number.isFinite(Number(card.variationAmount)) ? Number(card.variationAmount) : 0
		if (amount <= 0) return []
		return Array.isArray(card.variationsClean) ? card.variationsClean : []
	}

	const getKombiWords = (card) => {
		if (!card || card.categoryKey !== 'kombichaos') return { wordOne: '', wordTwo: '' }
		return {
			wordOne: String(card.wordOne || card.word1 || '').trim(),
			wordTwo: String(card.wordTwo || card.word2 || '').trim()
		}
	}

	const getFilteredCards = () => {
		return state.cards.filter((card) => {
			if (!state.enabledCategories.has(card.categoryKey)) {
				return false
			}

			if (!state.variationsOnly) {
				return true
			}

			return getCardVariations(card).length > 0
		})
	}

	const getData = async () => {
		// Try loading from remote API first (supports language code)
		try {
			const code = state.language === 'en' ? 'en' : 'de'
			const { key: apiKey, headerName: apiKeyHeaderName } = getClientApiKeyAndHeader()
			const headers = { 'Content-Type': 'application/json' }
			if (apiKey) headers[apiKeyHeaderName] = apiKey
			const response = await fetch(`${API_BASE}/cards?code=${code}`, { headers })
			if (response.ok) {
				const json = await response.json()
				// API may return an array or an object with `cards` field
				if (Array.isArray(json)) return { cards: json }
				if (json && Array.isArray(json.cards)) return json
			}
		} catch (error) {
			console.warn('Kartendaten von API konnten nicht geladen werden.', error)
			throw new Error('Konnte die Kartendaten nicht laden.')
		}
	}

	const isReloadNavigation = () => {
		const perf = typeof performance !== 'undefined' ? performance : null
		const navigationEntry = perf && typeof perf.getEntriesByType === 'function'
			? perf.getEntriesByType('navigation')[0]
			: null
		return navigationEntry
			? navigationEntry.type === 'reload'
			: perf?.navigation?.type === 1
	}

	const saveGameSession = () => {
		if (!state.currentCard) {
			return
		}
		const payload = {
			currentCardId: state.currentCard.id,
			drawPileIds: state.drawPile.map((card) => card.id),
			isFlipped: !!state.isFlipped,
			flipRotationDeg: state.flipRotationDeg
		}
		try {
			window.sessionStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(payload))
			window.localStorage.removeItem(GAME_SESSION_STORAGE_KEY)
		} catch (error) {
			console.warn('Spielstatus konnte nicht gespeichert werden.', error)
		}
	}

	const loadGameSession = () => {
		try {
			window.localStorage.removeItem(GAME_SESSION_STORAGE_KEY)
			if (isReloadNavigation()) {
				window.sessionStorage.removeItem(GAME_SESSION_STORAGE_KEY)
				return null
			}
			const raw = window.sessionStorage.getItem(GAME_SESSION_STORAGE_KEY)
			if (!raw) {
				return null
			}
			const parsed = JSON.parse(raw)
			if (!parsed || typeof parsed !== 'object' || typeof parsed.currentCardId !== 'string') {
				return null
			}
			return {
				currentCardId: parsed.currentCardId,
				drawPileIds: Array.isArray(parsed.drawPileIds) ? parsed.drawPileIds.filter((id) => typeof id === 'string') : [],
				isFlipped: !!parsed.isFlipped,
				flipRotationDeg: Number.isFinite(parsed.flipRotationDeg) ? parsed.flipRotationDeg : 180
			}
		} catch (error) {
			return null
		}
	}

	const setTheme = (card) => {
		const theme = CATEGORY_STYLES[card.categoryKey] || CATEGORY_STYLES.default
		const unifiedColor = theme.coreColor || theme.logoColor || theme.patternColorA || theme.accent

		app.classList.remove(...Object.values(CATEGORY_STYLES).map((entry) => entry.className))
		app.classList.add(theme.className)
		app.style.setProperty('--accent', theme.accent)
		app.style.setProperty('--accent-soft', theme.accentSoft)
		app.style.setProperty('--card-top', theme.top)
		app.style.setProperty('--card-bottom', theme.bottom)

		activeCard.style.setProperty('--card-text', theme.text)
		activeCard.style.setProperty('--card-pattern-url', `url("${theme.patternSrc}")`)
		activeCard.style.setProperty('--back-circle-a', unifiedColor)
		activeCard.style.setProperty('--back-circle-b', theme.patternColorB)
		activeCard.style.setProperty('--back-orbit-color', unifiedColor)
		activeCard.style.setProperty('--back-logo-tone', unifiedColor)
		activeCard.style.setProperty('--back-logo-src', `url("${theme.logoSrc}")`)
		activeCard.style.setProperty('--back-fill-tone', theme.circleFillColor || theme.patternColorA)
		activeCard.style.setProperty('--question-shell-bg', theme.questionShellBg || '#ffffff')
		activeCard.style.setProperty('--question-shell-text', theme.questionShellText || '#111111')
		applyCategoryBackground(card.categoryKey)
	}

	const setLoadingState = (isLoading) => {
		app.dataset.loading = isLoading ? 'true' : 'false'
		app.setAttribute('aria-busy', isLoading ? 'true' : 'false')
		activeCard.setAttribute('aria-hidden', isLoading ? 'true' : 'false')
		if (loadingIndicatorNode) {
			loadingIndicatorNode.setAttribute('aria-hidden', isLoading ? 'false' : 'true')
		}
	}

	const updateMotionButton = (label, className, pressed) => {
		if (!motionToggle) {
			return
		}

		motionToggle.textContent = label
		motionToggle.classList.remove('is-active', 'is-disabled')
		if (className) {
			motionToggle.classList.add(className)
		}
		motionToggle.setAttribute('aria-pressed', pressed ? 'true' : 'false')
	}

	const setMotionBaseline = (beta, gamma) => {
		if (!Number.isFinite(beta) || !Number.isFinite(gamma)) {
			state.motionBaselineBeta = null
			state.motionBaselineGamma = null
			state.motionBaselinePending = true
			state.filteredOrientationBeta = null
			state.filteredOrientationGamma = null
			state.previousOrientationBeta = null
			state.previousOrientationGamma = null
			state.previousOrientationTimestamp = 0
			state.orientationBetaWindow = []
			state.orientationGammaWindow = []
			state.motionSignalActive = false
			state.motionTargetIntent = 0
			state.motionTargets = { motionX: 0, motionY: 0, tiltX: 0, tiltY: 0, tiltZ: 0 }
			return
		}

		state.motionBaselineBeta = beta
		state.motionBaselineGamma = gamma
		state.motionBaselinePending = false
		state.filteredOrientationBeta = beta
		state.filteredOrientationGamma = gamma
		state.previousOrientationBeta = beta
		state.previousOrientationGamma = gamma
		state.previousOrientationTimestamp = performance.now()
		state.orientationBetaWindow = [beta]
		state.orientationGammaWindow = [gamma]
		state.motionSignalActive = false
		state.motionTargetIntent = 0
		state.motionTargets = { motionX: 0, motionY: 0, tiltX: 0, tiltY: 0, tiltZ: 0 }
	}

	const updateLanguageButton = () => {
		if (!languageToggle) {
			return
		}

		const isEnglish = state.language === 'en'
		languageToggle.textContent = isEnglish ? 'Deutsch' : 'English'
		languageToggle.classList.toggle('is-active', isEnglish)
		languageToggle.setAttribute('aria-pressed', isEnglish ? 'true' : 'false')
	}

	const updateAnswerLabels = () => {
		const copy = getAnswerCopy()
		if (answerToggleNode) {
			answerToggleNode.textContent = copy.toggle
		}
		if (answerNameLabelNode) {
			answerNameLabelNode.textContent = copy.name
		}
		if (answerTextLabelNode) {
			answerTextLabelNode.textContent = copy.answer
		}
		if (answerUsernameNode) {
			answerUsernameNode.placeholder = copy.namePlaceholder
		}
		if (answerTextNode) {
			answerTextNode.placeholder = copy.answerPlaceholder
		}
		if (answerSubmitNode) {
			answerSubmitNode.textContent = copy.submit
		}
		if (answerCancelNode) {
			answerCancelNode.textContent = copy.cancel
		}
		updateLeaderboardVisibility()
		renderLeaderboard(state.currentCard ? state.currentCard.id : '')
	}

	const updateLeaderboardVisibility = () => {
		const copy = getAnswerCopy()
		app.classList.toggle('is-leaderboard-view', state.answerLeaderboardOpen)
		if (answerLeaderboardNode) {
			answerLeaderboardNode.classList.toggle('is-open', state.answerLeaderboardOpen)
			answerLeaderboardNode.setAttribute('aria-hidden', state.answerLeaderboardOpen ? 'false' : 'true')
		}
		if (answerLeaderboardToggleNode) {
			answerLeaderboardToggleNode.textContent = state.answerLeaderboardOpen ? copy.hideLeaderboard : copy.showLeaderboard
			answerLeaderboardToggleNode.classList.toggle('is-active', state.answerLeaderboardOpen)
			answerLeaderboardToggleNode.setAttribute('aria-expanded', state.answerLeaderboardOpen ? 'true' : 'false')
		}
		if (state.answerLeaderboardOpen) {
			scheduleLeaderboardParallax()
		}
	}

	const setLeaderboardOpen = (open) => {
		state.answerLeaderboardOpen = !!open
		if (state.answerLeaderboardOpen) {
			state.rulesOpen = false
			updateRulesVisibility()
		}
		updateLeaderboardVisibility()
		if (state.answerLeaderboardOpen) {
			// load latest history from API and render
			fetchHistoryFromApi().then((history) => {
				state.answerHistory = history
				renderLeaderboard(state.currentCard ? state.currentCard.id : '')
			}).catch(() => {
				renderLeaderboard(state.currentCard ? state.currentCard.id : '')
			})
		}
	}

	const updateAnswerSubmitState = () => {
		if (!answerSubmitNode || !answerUsernameNode || !answerTextNode) {
			return
		}
		const hasUsername = answerUsernameNode.value.trim().length > 0
		const hasAnswer = answerTextNode.value.trim().length > 0
		answerSubmitNode.disabled = !(hasUsername && hasAnswer)
	}

	const setAnswerComposerOpen = (open, options = {}) => {
		const { clearStatus = true } = options
		state.answerComposerOpen = !!open
		if (answerFormNode) {
			answerFormNode.hidden = !state.answerComposerOpen
		}
		if (answerComposerNode) {
			answerComposerNode.classList.toggle('is-open', state.answerComposerOpen)
		}
		if (answerToggleNode) {
			answerToggleNode.setAttribute('aria-expanded', state.answerComposerOpen ? 'true' : 'false')
		}
		if (clearStatus && answerStatusNode) {
			answerStatusNode.textContent = ''
		}
		if (state.answerComposerOpen && answerUsernameNode) {
			window.setTimeout(() => answerUsernameNode.focus(), 40)
		}
		fitQuestionText()
	}

	const resetAnswerComposer = () => {
		if (state.answerSuccessTimer) {
			clearTimeout(state.answerSuccessTimer)
			state.answerSuccessTimer = null
		}
		if (answerUsernameNode) {
			answerUsernameNode.value = ''
		}
		if (answerTextNode) {
			answerTextNode.value = ''
		}
		if (answerStatusNode) {
			answerStatusNode.textContent = ''
		}
		updateAnswerSubmitState()
		setAnswerComposerOpen(false)
	}

	const isAnswerInteractionTarget = (target) => {
		return !!(answerComposerNode && target instanceof Node && answerComposerNode.contains(target))
	}

	const setFilterMenuOpen = (open) => {
		state.filterMenuOpen = !!open
		if (!filterMenu || !filterToggle) {
			return
		}

		filterMenu.hidden = !state.filterMenuOpen
		filterMenu.setAttribute('aria-hidden', state.filterMenuOpen ? 'false' : 'true')
		filterMenu.classList.toggle('is-open', state.filterMenuOpen)
		filterToggle.classList.toggle('is-active', state.filterMenuOpen)
		filterToggle.setAttribute('aria-expanded', state.filterMenuOpen ? 'true' : 'false')
	}

	const applySpawnMotionMode = (mode, persist = true) => {
		const nextMode = normalizeSpawnMotionMode(mode)
		state.spawnMotionMode = nextMode
		app.setAttribute('data-spawn-motion', nextMode)

		if (!persist) {
			return
		}

		try {
			window.localStorage.setItem(SPAWN_MOTION_STORAGE_KEY, nextMode)
		} catch (error) {
			console.warn('Spawn-Motion-Einstellung konnte nicht gespeichert werden.', error)
		}
	}

	const applyMotionVisualState = () => {
		if (!app) {
			return
		}
		const visualsOn = state.isMotionEnabled || state.motionPermissionState === 'granted'
		const motionFlag = visualsOn ? '1' : '0'
		app.style.setProperty('--motion-visual-enabled', motionFlag)
		app.setAttribute('data-motion-active', visualsOn ? 'on' : 'off')
		app.classList.toggle('motion-visuals-off', !visualsOn)

		if (activeCard) {
			activeCard.style.setProperty('--motion-visual-enabled', motionFlag)
			activeCard.classList.toggle('motion-visuals-on', visualsOn)
			activeCard.classList.toggle('motion-visuals-off', !visualsOn)
		}
		if (variationCardNode) {
			variationCardNode.style.setProperty('--motion-visual-enabled', motionFlag)
			variationCardNode.classList.toggle('motion-visuals-on', visualsOn)
			variationCardNode.classList.toggle('motion-visuals-off', !visualsOn)
		}
		if (variationFanNode) {
			variationFanNode.style.setProperty('--motion-visual-enabled', motionFlag)
			variationFanNode.classList.toggle('motion-visuals-on', visualsOn)
			variationFanNode.classList.toggle('motion-visuals-off', !visualsOn)
		}
	}

	const applyMotionTransform = () => {
		const target = activeCard
		target.style.setProperty('--motion-x', `${state.motionX}px`)
		target.style.setProperty('--motion-y', `${state.motionY}px`)
		target.style.setProperty('--tilt-x', `${state.tiltX}deg`)
		target.style.setProperty('--tilt-y', `${state.tiltY}deg`)
		target.style.setProperty('--tilt-z', `${state.tiltZ}deg`)

		const combinedTiltX = state.tiltX + state.dragOffsetX * 0.05
		const combinedTiltY = state.tiltY + state.dragOffsetY * 0.045
		const shineX = Math.max(12, Math.min(88, 50 + (combinedTiltX / MAX_TILT_X) * SHINE_SHIFT_X_MAX))
		const shineY = Math.max(10, Math.min(90, 36 + (combinedTiltY / MAX_TILT_Y) * SHINE_SHIFT_Y_MAX))
		const motionEnergy = Math.min(1, (Math.abs(combinedTiltX) + Math.abs(combinedTiltY) + Math.abs(state.tiltZ)) / 28)
		const shineAlpha = 0.12 + motionEnergy * 0.36
		const shineEdgeAlpha = 0.16 + motionEnergy * 0.34
		const shineRimAlpha = 0.28 + motionEnergy * 0.45
		const shineSpeckleAlpha = 0.9 + motionEnergy * 0.1
		target.style.setProperty('--shine-x', `${shineX}%`)
		target.style.setProperty('--shine-y', `${shineY}%`)
		target.style.setProperty('--shine-alpha', `${shineAlpha.toFixed(3)}`)
		target.style.setProperty('--shine-edge-alpha', `${shineEdgeAlpha.toFixed(3)}`)
		target.style.setProperty('--shine-rim-alpha', `${shineRimAlpha.toFixed(3)}`)
		target.style.setProperty('--shine-speckle-alpha', `${shineSpeckleAlpha.toFixed(3)}`)
		const facetAlpha = 0.2 + motionEnergy * 0.38
		const facetShiftX = Math.max(6, Math.min(94, 50 + (combinedTiltX / MAX_TILT_X) * 34))
		const facetShiftY = Math.max(6, Math.min(94, 50 + (combinedTiltY / MAX_TILT_Y) * 30))
		target.style.setProperty('--facet-alpha', `${facetAlpha.toFixed(3)}`)
		target.style.setProperty('--facet-shift-x', `${facetShiftX}%`)
		target.style.setProperty('--facet-shift-y', `${facetShiftY}%`)
		if (variationCardNode) {
			variationCardNode.style.setProperty('--shine-x', `${shineX}%`)
			variationCardNode.style.setProperty('--shine-y', `${shineY}%`)
			variationCardNode.style.setProperty('--shine-alpha', `${(shineAlpha * 0.86).toFixed(3)}`)
			variationCardNode.style.setProperty('--shine-edge-alpha', `${(shineEdgeAlpha * 0.9).toFixed(3)}`)
			variationCardNode.style.setProperty('--shine-rim-alpha', `${(shineRimAlpha * 0.86).toFixed(3)}`)
			variationCardNode.style.setProperty('--facet-alpha', `${(facetAlpha * 0.86).toFixed(3)}`)
			variationCardNode.style.setProperty('--facet-shift-x', `${facetShiftX}%`)
			variationCardNode.style.setProperty('--facet-shift-y', `${facetShiftY}%`)
			variationCardNode.style.setProperty('--v-tilt-x', `${(state.tiltX * 0.78).toFixed(3)}deg`)
			variationCardNode.style.setProperty('--v-tilt-y', `${(state.tiltY * 0.78).toFixed(3)}deg`)
			variationCardNode.style.setProperty('--v-tilt-z', `${(state.tiltZ * 0.7).toFixed(3)}deg`)
		}
		if (variationFanNode) {
			variationFanNode.style.setProperty('--fan-tilt-x', `${(state.tiltX * 0.74).toFixed(3)}deg`)
			variationFanNode.style.setProperty('--fan-tilt-y', `${(state.tiltY * 0.74).toFixed(3)}deg`)
			variationFanNode.style.setProperty('--fan-tilt-z', `${(state.tiltZ * 0.62).toFixed(3)}deg`)
		}
	}

	const generateMicrofacetTexture = () => {
		const canvas = document.createElement('canvas')
		canvas.width = FACET_TEX_WIDTH
		canvas.height = FACET_TEX_HEIGHT
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			return null
		}
		ctx.imageSmoothingEnabled = false

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (let index = 0; index < FACET_POLYGON_COUNT; index += 1) {
			const centerX = Math.random() * canvas.width
			const centerY = Math.random() * canvas.height
			const radius = 0.45 + Math.random() * 1.35
			const points = Math.random() < 0.52 ? 3 : 4
			const spin = Math.random() * Math.PI * 2
			const alphaBias = Math.random()
			const alpha = 0.06 + Math.pow(alphaBias, 1.7) * 0.72
			ctx.beginPath()
			for (let point = 0; point < points; point += 1) {
				const angle = spin + (Math.PI * 2 * point) / points + (Math.random() - 0.5) * 0.3
				const variance = radius * (0.64 + Math.random() * 0.58)
				const px = centerX + Math.cos(angle) * variance
				const py = centerY + Math.sin(angle) * variance
				if (point === 0) {
					ctx.moveTo(px, py)
				} else {
					ctx.lineTo(px, py)
				}
			}
			ctx.closePath()
			const toneShift = (Math.random() - 0.5) * 20
			const red = Math.max(232, Math.min(255, Math.round(248 + toneShift * 0.9)))
			const green = Math.max(232, Math.min(255, Math.round(246 + toneShift * 0.5)))
			const blue = Math.max(232, Math.min(255, Math.round(250 - toneShift * 0.7)))
			ctx.fillStyle = `rgba(${red},${green},${blue},${alpha.toFixed(4)})`
			ctx.fill()
		}

		for (let sparkle = 0; sparkle < 760; sparkle += 1) {
			const x = Math.random() * canvas.width
			const y = Math.random() * canvas.height
			const dotBias = Math.random()
			const dotAlpha = 0.05 + Math.pow(dotBias, 1.55) * 0.62
			const dotTone = (Math.random() - 0.5) * 24
			const dotRed = Math.max(230, Math.min(255, Math.round(249 + dotTone * 0.8)))
			const dotGreen = Math.max(230, Math.min(255, Math.round(247 + dotTone * 0.45)))
			const dotBlue = Math.max(230, Math.min(255, Math.round(251 - dotTone * 0.75)))
			ctx.fillStyle = `rgba(${dotRed},${dotGreen},${dotBlue},${dotAlpha.toFixed(4)})`
			ctx.fillRect(x, y, 1, 1)
		}

		return canvas.toDataURL('image/png')
	}

	const applyMicrofacetTexture = () => {
		const textureDataUrl = generateMicrofacetTexture()
		if (!textureDataUrl) {
			return
		}
		activeCard.style.setProperty('--facet-map', `url("${textureDataUrl}")`)
		if (variationCardNode) {
			variationCardNode.style.setProperty('--facet-map', `url("${textureDataUrl}")`)
		}
	}

	const updateTiltFromPointer = (event) => {
		if (!state.isMotionEnabled || state.isMotionSuspended || !event || event.pointerType !== 'mouse') {
			return
		}

		const viewportWidth = Math.max(1, window.innerWidth || 1)
		const viewportHeight = Math.max(1, window.innerHeight || 1)
		const normalizedX = ((event.clientX / viewportWidth) - 0.5) * 2
		const normalizedY = ((event.clientY / viewportHeight) - 0.5) * 2

		const targetMotionX = softClamp(normalizedX * MAX_MOTION_X * 0.9, MAX_MOTION_X)
		const targetMotionY = softClamp(normalizedY * MAX_MOTION_Y * 0.9, MAX_MOTION_Y)
		const targetTiltX = softClamp(normalizedX * MAX_TILT_X * 1.9, MAX_TILT_X)
		const targetTiltY = softClamp(normalizedY * MAX_TILT_Y * 1.9, MAX_TILT_Y)
		const targetTiltZ = softClamp(normalizedX * MAX_TILT_Z * 2.12, MAX_TILT_Z)

		state.motionTargets.motionX = targetMotionX
		state.motionTargets.motionY = targetMotionY
		state.motionTargets.tiltX = targetTiltX
		state.motionTargets.tiltY = targetTiltY
		state.motionTargets.tiltZ = targetTiltZ
		state.motionTargetIntent = 0.9
		startMotionLoop()
	}

	const setFlipClass = (flipped) => {
		// Flip contract: only class state here. Rotation is owned by `.active-card__faces` in CSS.
		state.isFlipped = !!flipped
		if (state.isFlipped) {
			activeCard.classList.add('is-flipped')
		} else {
			activeCard.classList.remove('is-flipped')
		}
	}

	const hideFlipCue = () => {
		if (!flipCueNode) {
			return
		}
		if (state.flipCueTimer) {
			clearTimeout(state.flipCueTimer)
			state.flipCueTimer = null
		}
		flipCueNode.hidden = true
		flipCueNode.classList.remove('is-visible')
	}

	const scheduleFlipCue = () => {
		if (!flipCueNode || state.hasFlippedCardOnce || !state.isFlipped || state.isAnimating) {
			hideFlipCue()
			return
		}

		hideFlipCue()
		state.flipCueTimer = window.setTimeout(() => {
			if (state.hasFlippedCardOnce || !state.isFlipped || state.isAnimating) {
				return
			}
			flipCueNode.hidden = false
			flipCueNode.classList.add('is-visible')
		}, FLIP_CUE_DELAY_MS)
	}

	const hideSwipeUpCue = () => {
		if (!swipeUpCueNode) {
			return
		}
		if (state.swipeUpCueTimer) {
			clearTimeout(state.swipeUpCueTimer)
			state.swipeUpCueTimer = null
		}
		swipeUpCueNode.hidden = true
		swipeUpCueNode.classList.remove('is-visible')
	}

	const scheduleSwipeUpCue = () => {
		if (!swipeUpCueNode || state.hasSwipedUpOnce || state.isAnimating || state.isDragging) {
			hideSwipeUpCue()
			return
		}

		hideSwipeUpCue()
		state.swipeUpCueTimer = window.setTimeout(() => {
			if (state.hasSwipedUpOnce || state.isAnimating || state.isDragging) {
				return
			}
			swipeUpCueNode.hidden = false
			swipeUpCueNode.classList.add('is-visible')
		}, SWIPE_UP_CUE_DELAY_MS)
	}

	const destroyVariationScratch = () => {
		if (typeof state.variationScratchCleanup === 'function') {
			state.variationScratchCleanup()
		}
		state.variationScratchCleanup = null
		if (state.variationSketch && typeof state.variationSketch.remove === 'function') {
			state.variationSketch.remove()
		}
		state.variationSketch = null
		if (variationScratchNode) {
			variationScratchNode.innerHTML = ''
		}
	}

	const resolveVariationVisual = (index) => {
		const fallback = VARIATION_VISUALS[0]
		if (VARIATION_VISUALS.length === 0) {
			return fallback
		}
		return VARIATION_VISUALS[((index % VARIATION_VISUALS.length) + VARIATION_VISUALS.length) % VARIATION_VISUALS.length] || fallback
	}

	const buildVariationChoices = (card) => {
		const variationList = getCardVariations(card)
		state.variationChoices = variationList.map((text, index) => ({
			index,
			text,
			visual: resolveVariationVisual(index)
		}))
		state.activeVariationIndex = -1
	}

	const applyVariationVisualTheme = (visual) => {
		if (!variationCardNode || !visual) {
			return
		}
		variationCardNode.style.setProperty('--variation-purple-a', visual.colorA)
		variationCardNode.style.setProperty('--variation-purple-b', visual.colorB)
		variationCardNode.style.setProperty('--variation-pattern-url', `url("${visual.patternSrc}")`)
	}

	const renderVariationFan = () => {
		if (!variationFanNode) {
			return
		}
		variationFanNode.innerHTML = ''
		const choices = state.variationChoices
		const isVisible = state.hasVariations && choices.length > 1
		if (!isVisible) {
			variationFanNode.hidden = true
			variationFanNode.setAttribute('aria-hidden', 'true')
			variationFanNode.classList.remove('is-selection-open')
			return
		}

		variationFanNode.hidden = false
		variationFanNode.setAttribute('aria-hidden', 'false')
		variationFanNode.classList.toggle('is-selection-open', state.miniCardOpen)
		choices.forEach((choice, position) => {
			const button = document.createElement('button')
			button.type = 'button'
			button.className = 'variation-fan__card'
			button.dataset.variationIndex = String(choice.index)
			const centeredOffset = position - (choices.length - 1) / 2
			button.style.setProperty('--fan-offset', `${centeredOffset}`)
			button.style.setProperty('--fan-depth', `${Math.abs(centeredOffset)}`)
			button.style.setProperty('--fan-color-a', choice.visual.colorA)
			button.style.setProperty('--fan-color-b', choice.visual.colorB)
			button.style.setProperty('--fan-pattern-url', `url("${choice.visual.patternSrc}")`)
			button.setAttribute('aria-label', `Variation ${choice.index + 1}`)
			if (state.activeVariationIndex === choice.index && state.miniCardOpen) {
				button.classList.add('is-selected')
			}
			variationFanNode.appendChild(button)
		})
	}

	const setVariationVisualState = (visualState) => {
		if (!variationCardNode) {
			return
		}

		variationCardNode.classList.remove('is-peek', 'is-flying-in', 'is-open-center', 'is-flying-out')

		if (visualState === 'peek') {
			variationCardNode.classList.add('is-peek')
			return
		}

		if (visualState === 'flying-in') {
			variationCardNode.classList.add('is-flying-in')
			return
		}

		if (visualState === 'open-center') {
			variationCardNode.classList.add('is-open-center')
			return
		}

		if (visualState === 'flying-out') {
			variationCardNode.classList.add('is-flying-out')
		}
	}

	const clearVariationTeaserSuppressClick = () => {
		if (state.variationTeaserSuppressClickTimer) {
			clearTimeout(state.variationTeaserSuppressClickTimer)
			state.variationTeaserSuppressClickTimer = null
		}
		state.variationTeaserSuppressClick = false
	}

	const setVariationTeaserSuppressClick = () => {
		state.variationTeaserSuppressClick = true
		if (state.variationTeaserSuppressClickTimer) {
			clearTimeout(state.variationTeaserSuppressClickTimer)
		}
		state.variationTeaserSuppressClickTimer = window.setTimeout(() => {
			state.variationTeaserSuppressClick = false
			state.variationTeaserSuppressClickTimer = null
		}, 260)
	}

	const applyVariationTeaserDrag = (x, y) => {
		state.variationTeaserDragX = x
		state.variationTeaserDragY = y
		variationCardNode?.style.setProperty('--variation-drag-x', `${x}px`)
		variationCardNode?.style.setProperty('--variation-drag-y', `${y}px`)
	}

	const resetVariationTeaserDrag = ({ animate = false } = {}) => {
		if (!variationCardNode) {
			return
		}
		state.variationTeaserDragging = false
		state.variationTeaserPointerId = null
		state.variationTeaserDragStartX = 0
		state.variationTeaserDragStartY = 0
		state.variationTeaserDragProgress = 0
		variationCardNode.classList.remove('is-dragging', 'is-snapping')
		variationCardNode.classList.toggle('is-returning', !!animate)
		applyVariationTeaserDrag(0, 0)
		if (animate) {
			window.setTimeout(() => {
				variationCardNode.classList.remove('is-returning')
			}, 280)
		} else {
			variationCardNode.classList.remove('is-returning')
		}
	}

	const canDragVariationTeaser = () => {
		if (!variationCardNode || state.isAnimating || state.miniCardOpen || !state.hasVariations) {
			return false
		}
		return variationCardNode.classList.contains('is-peek')
	}

	const isVariationTeaserNearCenter = () => {
		if (!variationCardNode) {
			return false
		}
		const rect = variationCardNode.getBoundingClientRect()
		const cardCenterX = rect.left + rect.width * 0.5
		const cardCenterY = rect.top + rect.height * 0.5
		const viewportCenterX = window.innerWidth * 0.5
		const viewportCenterY = window.innerHeight * 0.5
		const distanceToCenter = Math.hypot(cardCenterX - viewportCenterX, cardCenterY - viewportCenterY)
		const snapRadius = Math.min(window.innerWidth, window.innerHeight) * VARIATION_DRAG_SNAP_CENTER_RATIO
		return distanceToCenter <= snapRadius
	}

	const dismissVariationCard = () => {
		if (!variationCardNode || !state.miniCardOpen) {
			return
		}

		resetVariationTeaserDrag()
		state.miniCardOpen = false
		state.canDismissVariation = false
		setVariationVisualState('flying-out')
		window.setTimeout(() => {
			if (state.hasVariations && state.variationChoices.length <= 1) {
				setVariationVisualState('peek')
				variationCardNode.hidden = false
				variationCardNode.setAttribute('aria-hidden', 'false')
			} else {
				variationCardNode.hidden = true
				variationCardNode.setAttribute('aria-hidden', 'true')
			}
			state.activeVariationIndex = -1
			renderVariationFan()
			destroyVariationScratch()
		}, VARIATION_FLY_MS)
	}

	const closeVariationCard = () => {
		resetVariationTeaserDrag()
		state.miniCardOpen = false
		state.scratchRevealed = false
		state.canDismissVariation = false
		state.activeVariationIndex = -1
		if (variationCardNode) {
			variationCardNode.classList.remove('is-open', 'is-revealed', 'is-peek', 'is-flying-in', 'is-open-center', 'is-flying-out')
			if (state.hasVariations && state.variationChoices.length <= 1) {
				variationCardNode.hidden = false
				variationCardNode.setAttribute('aria-hidden', 'false')
				setVariationVisualState('peek')
			} else {
				variationCardNode.hidden = true
				variationCardNode.setAttribute('aria-hidden', 'true')
			}
		}
		renderVariationFan()
		destroyVariationScratch()
	}

	const setVariationTabVisibility = (visible) => {
		if (!variationCardNode) {
			return
		}

		state.hasVariations = !!visible
		if (visible) {
			if (state.variationChoices.length > 1) {
				variationCardNode.hidden = true
				variationCardNode.setAttribute('aria-hidden', 'true')
			} else {
				setVariationVisualState('peek')
				variationCardNode.hidden = false
				variationCardNode.setAttribute('aria-hidden', 'false')
			}
		} else {
			variationCardNode.hidden = true
			variationCardNode.setAttribute('aria-hidden', 'true')
		}
		renderVariationFan()
	}

	const createVariationScratch = () => {
		if (!variationScratchNode || !variationCardNode || typeof window.p5 !== 'function') {
			return
		}

		destroyVariationScratch()

		const host = variationScratchNode
		const dustCanvas = document.createElement('canvas')
		dustCanvas.className = 'variation-mini-card__dust'
		host.appendChild(dustCanvas)
		const dustCtx = dustCanvas.getContext('2d')
		const dustParticles = []
		let dustRafId = 0
		let lastDustTime = 0
		let lastDustSpawnAt = 0
		const MAX_DUST_PARTICLES = 120
		const DUST_SPAWN_COOLDOWN_MS = 12

		const resizeDustCanvas = () => {
			if (!dustCtx) {
				return
			}
			const bounds = host.getBoundingClientRect()
			const ratio = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
			dustCanvas.width = Math.max(1, Math.round(bounds.width * ratio))
			dustCanvas.height = Math.max(1, Math.round(bounds.height * ratio))
			dustCanvas.style.width = `${bounds.width}px`
			dustCanvas.style.height = `${bounds.height}px`
			dustCtx.setTransform(ratio, 0, 0, ratio, 0, 0)
		}

		const stopDustLoop = () => {
			if (dustRafId) {
				cancelAnimationFrame(dustRafId)
				dustRafId = 0
			}
		}

		const runDustLoop = (timeNow) => {
			if (!dustCtx) {
				stopDustLoop()
				return
			}
			const now = Number.isFinite(timeNow) ? timeNow : performance.now()
			const delta = Math.min(34, Math.max(8, now - (lastDustTime || now)))
			lastDustTime = now
			const dt = delta / 16.667
			const width = parseFloat(dustCanvas.style.width || '0') || host.clientWidth || 1
			const height = parseFloat(dustCanvas.style.height || '0') || host.clientHeight || 1
			dustCtx.clearRect(0, 0, width, height)
			for (let index = dustParticles.length - 1; index >= 0; index -= 1) {
				const particle = dustParticles[index]
				particle.vy += 0.12 * dt
				particle.x += particle.vx * dt
				particle.y += particle.vy * dt
				particle.life -= delta
				if (particle.life <= 0 || particle.y > height + 8) {
					dustParticles.splice(index, 1)
					continue
				}
				const alpha = Math.max(0, particle.life / particle.maxLife)
				dustCtx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${(alpha * 0.7).toFixed(3)})`
				dustCtx.beginPath()
				dustCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
				dustCtx.fill()
			}

			if (dustParticles.length > 0) {
				dustRafId = requestAnimationFrame(runDustLoop)
			} else {
				stopDustLoop()
			}
		}

		const spawnDustParticles = (x, y) => {
			const now = performance.now()
			if (now - lastDustSpawnAt < DUST_SPAWN_COOLDOWN_MS) {
				return
			}
			lastDustSpawnAt = now
			const spawnCount = 3
			for (let count = 0; count < spawnCount; count += 1) {
				if (dustParticles.length >= MAX_DUST_PARTICLES) {
					dustParticles.shift()
				}
				dustParticles.push({
					x: x + (Math.random() - 0.5) * 8,
					y: y + (Math.random() - 0.5) * 6,
					vx: (Math.random() - 0.5) * 1.6,
					vy: -1.2 - Math.random() * 1.6,
					size: 0.8 + Math.random() * 1.8,
					maxLife: 320 + Math.random() * 420,
					life: 320 + Math.random() * 420,
					r: 232 + Math.round(Math.random() * 22),
					g: 210 + Math.round(Math.random() * 38),
					b: 255
				})
			}
			if (!dustRafId) {
				lastDustTime = now
				dustRafId = requestAnimationFrame(runDustLoop)
			}
		}

		resizeDustCanvas()
		state.variationScratchCleanup = () => {
			stopDustLoop()
			dustParticles.length = 0
			if (dustCanvas.parentNode === host) {
				host.removeChild(dustCanvas)
			}
		}
		const p5Instance = new window.p5((p) => {
			let brushSize = 28
			let didComplete = false
			let sampleTicker = 0
			let lastScratchX = null
			let lastScratchY = null
			let nativeScratchCtx = null
			let pointerScratchActive = false

			const parsePercentValue = (raw, fallback) => {
				const numeric = Number.parseFloat(String(raw || '').replace('%', '').trim())
				return Number.isFinite(numeric) ? numeric : fallback
			}

			const resolveScratchLight = () => {
				const styles = window.getComputedStyle(variationCardNode)
				return {
					shineX: parsePercentValue(styles.getPropertyValue('--shine-x'), 50),
					shineY: parsePercentValue(styles.getPropertyValue('--shine-y'), 36),
					shineAlpha: parsePercentValue(styles.getPropertyValue('--shine-alpha'), 0.28)
				}
			}

			const drawIridescentScratchCover = () => {
				const light = resolveScratchLight()
				const hotspotX = (light.shineX / 100) * p.width
				const hotspotY = (light.shineY / 100) * p.height
				const maxDistance = Math.hypot(p.width, p.height)

				p.clear()
				p.noStroke()
				p.fill(120, 62, 170, 252)
				p.rect(0, 0, p.width, p.height)

				const anchors = [
					[98, 245, 255], // electric cyan
					[255, 108, 230], // hot magenta
					[255, 224, 92], // bright gold
					[120, 255, 178], // neon mint
					[132, 182, 255], // azure
					[255, 132, 120], // coral
					[196, 128, 255], // purple
					[255, 168, 76] // orange
				]

				const pickIridescentTone = () => {
					const index = Math.floor(Math.random() * anchors.length)
					const base = anchors[index]
					const whiteMix = 0.12 + Math.random() * 0.36
					const hueJitter = (Math.random() - 0.5) * 58
					const red = Math.round(base[0] * (1 - whiteMix) + 255 * whiteMix + hueJitter * 0.82)
					const green = Math.round(base[1] * (1 - whiteMix) + 255 * whiteMix + hueJitter * 0.3)
					const blue = Math.round(base[2] * (1 - whiteMix) + 255 * whiteMix - hueJitter * 0.76)
					return [
						Math.max(92, Math.min(255, red)),
						Math.max(92, Math.min(255, green)),
						Math.max(92, Math.min(255, blue))
					]
				}

				for (let dot = 0; dot < SCRATCH_GRAIN_DOT_COUNT; dot += 1) {
					const x = Math.random() * p.width
					const y = Math.random() * p.height
					const distance = Math.hypot(x - hotspotX, y - hotspotY)
					const hit = Math.max(0, 1 - distance / maxDistance)
					const directionalBoost = Math.pow(hit, 2.8)
					const randomBias = Math.pow(Math.random(), 1.9)
					const alpha = 0.012 + randomBias * 0.1 + directionalBoost * (0.22 + light.shineAlpha * 0.18)
					const size = 0.32 + Math.pow(Math.random(), 1.6) * 1.15
					const color = pickIridescentTone()
					p.fill(color[0], color[1], color[2], Math.min(255, Math.round(alpha * 255)))
					p.circle(x, y, size)
				}

				for (let flake = 0; flake < SCRATCH_GRAIN_FLAKE_COUNT; flake += 1) {
					const centerX = Math.random() * p.width
					const centerY = Math.random() * p.height
					const distance = Math.hypot(centerX - hotspotX, centerY - hotspotY)
					const hit = Math.max(0, 1 - distance / maxDistance)
					const directionalBoost = Math.pow(hit, 3)
					const points = Math.random() < 0.62 ? 3 : 4
					const radius = 0.34 + Math.random() * 1.02
					const spin = Math.random() * Math.PI * 2
					const alpha = 0.045 + Math.random() * 0.15 + directionalBoost * (0.2 + light.shineAlpha * 0.2)
					const color = pickIridescentTone()
					p.fill(color[0], color[1], color[2], Math.min(255, Math.round(alpha * 255)))
					p.beginShape()
					for (let vertex = 0; vertex < points; vertex += 1) {
						const angle = spin + (Math.PI * 2 * vertex) / points + (Math.random() - 0.5) * 0.2
						const radial = radius * (0.62 + Math.random() * 0.55)
						p.vertex(centerX + Math.cos(angle) * radial, centerY + Math.sin(angle) * radial)
					}
					p.endShape(p.CLOSE)
				}
			}

			const scratchLine = (x, y, previousX = null, previousY = null) => {
				const fromX = Number.isFinite(previousX) ? previousX : x
				const fromY = Number.isFinite(previousY) ? previousY : y
				p.line(fromX, fromY, x, y)
				evaluateReveal()
			}

			const nativeScratchLine = (x, y, previousX = null, previousY = null) => {
				if (!nativeScratchCtx) {
					scratchLine(x, y, previousX, previousY)
					return
				}
				const fromX = Number.isFinite(previousX) ? previousX : x
				const fromY = Number.isFinite(previousY) ? previousY : y
				nativeScratchCtx.save()
				nativeScratchCtx.globalCompositeOperation = 'destination-out'
				nativeScratchCtx.lineCap = 'round'
				nativeScratchCtx.lineJoin = 'round'
				nativeScratchCtx.lineWidth = brushSize
				nativeScratchCtx.strokeStyle = 'rgba(0,0,0,1)'
				nativeScratchCtx.beginPath()
				nativeScratchCtx.moveTo(fromX, fromY)
				nativeScratchCtx.lineTo(x, y)
				nativeScratchCtx.stroke()
				nativeScratchCtx.restore()
				spawnDustParticles(x, y)
				evaluateReveal()
			}

			p.setup = () => {
				const bounds = host.getBoundingClientRect()
				const canvas = p.createCanvas(bounds.width, bounds.height)
				canvas.parent(host)
				if (canvas?.elt) {
					nativeScratchCtx = canvas.elt.getContext('2d')
					const supportsPointer = typeof window.PointerEvent === 'function'
					const toLocalPoint = (touch) => {
						const rect = canvas.elt.getBoundingClientRect()
						return {
							x: touch.clientX - rect.left,
							y: touch.clientY - rect.top
						}
					}

					const preventTouchDefaults = (event) => {
						event.preventDefault()
					}
					const onNativeTouchStart = (event) => {
						preventTouchDefaults(event)
						if (!event.touches || event.touches.length === 0) return
						const point = toLocalPoint(event.touches[0])
						lastScratchX = point.x
						lastScratchY = point.y
						nativeScratchLine(point.x, point.y, point.x, point.y)
					}
					const onNativeTouchMove = (event) => {
						preventTouchDefaults(event)
						if (!event.touches || event.touches.length === 0) return
						const point = toLocalPoint(event.touches[0])
						nativeScratchLine(point.x, point.y, lastScratchX, lastScratchY)
						lastScratchX = point.x
						lastScratchY = point.y
					}
					const onNativeTouchEnd = (event) => {
						preventTouchDefaults(event)
						lastScratchX = null
						lastScratchY = null
					}

					const onPointerStart = (event) => {
						if (!supportsPointer || !event.isPrimary) {
							return
						}
						if (event.pointerType === 'mouse' && event.buttons !== 1) {
							return
						}
						preventTouchDefaults(event)
						pointerScratchActive = true
						const point = toLocalPoint(event)
						lastScratchX = point.x
						lastScratchY = point.y
						nativeScratchLine(point.x, point.y, point.x, point.y)
						if (typeof canvas.elt.setPointerCapture === 'function') {
							try {
								canvas.elt.setPointerCapture(event.pointerId)
							} catch (_error) {
								// no-op
							}
						}
					}

					const onPointerMove = (event) => {
						if (!supportsPointer || !pointerScratchActive || !event.isPrimary) {
							return
						}
						preventTouchDefaults(event)
						const point = toLocalPoint(event)
						nativeScratchLine(point.x, point.y, lastScratchX, lastScratchY)
						lastScratchX = point.x
						lastScratchY = point.y
					}

					const onPointerEnd = (event) => {
						if (!supportsPointer || !event.isPrimary) {
							return
						}
						preventTouchDefaults(event)
						pointerScratchActive = false
						lastScratchX = null
						lastScratchY = null
						if (typeof canvas.elt.releasePointerCapture === 'function') {
							try {
								canvas.elt.releasePointerCapture(event.pointerId)
							} catch (_error) {
								// no-op
							}
						}
					}

					canvas.elt.addEventListener('touchstart', onNativeTouchStart, { passive: false })
					canvas.elt.addEventListener('touchmove', onNativeTouchMove, { passive: false })
					canvas.elt.addEventListener('touchend', onNativeTouchEnd, { passive: false })
					canvas.elt.addEventListener('touchcancel', onNativeTouchEnd, { passive: false })
					canvas.elt.addEventListener('pointerdown', onPointerStart, { passive: false })
					canvas.elt.addEventListener('pointermove', onPointerMove, { passive: false })
					canvas.elt.addEventListener('pointerup', onPointerEnd, { passive: false })
					canvas.elt.addEventListener('pointercancel', onPointerEnd, { passive: false })
				}
				p.pixelDensity(1)
				p.noLoop()
				drawIridescentScratchCover()
				p.strokeWeight(brushSize)
				p.strokeCap(p.ROUND)
				p.erase(255, 255)
			}

			const evaluateReveal = () => {
				if (didComplete) {
					return
				}
				sampleTicker += 1
				if (sampleTicker % 4 !== 0) {
					return
				}
				p.loadPixels()
				let transparentCount = 0
				for (let i = 3; i < p.pixels.length; i += 4) {
					if (p.pixels[i] < 14) {
						transparentCount += 1
					}
				}
				const revealRatio = transparentCount / (p.width * p.height)
				if (revealRatio >= VARIATION_SCRATCH_THRESHOLD) {
					didComplete = true
					state.scratchRevealed = true
					state.canDismissVariation = true
				}
			}

			p.mouseDragged = () => {
				p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY)
				evaluateReveal()
				return false
			}

			p.touchMoved = () => {
				p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY)
				evaluateReveal()
				return false
			}

			p.windowResized = () => {
				const bounds = host.getBoundingClientRect()
				p.resizeCanvas(bounds.width, bounds.height)
				resizeDustCanvas()
			}
		})

		state.variationSketch = p5Instance
	}

	const openVariationCard = (selectedIndex = 0, options = {}) => {
		const { fromDragSnap = false } = options
		if (!state.currentCard || !variationCardNode || !variationTextNode || state.isAnimating || !state.hasVariations) {
			return
		}

		const choice = state.variationChoices[selectedIndex]
		if (!choice?.text) {
			return
		}

		state.currentVariationText = choice.text
		state.activeVariationIndex = choice.index
		if (!fromDragSnap) {
			resetVariationTeaserDrag()
		}
		state.miniCardOpen = true
		state.scratchRevealed = false
		state.canDismissVariation = true
		variationTextNode.textContent = choice.text
		applyVariationVisualTheme(choice.visual)
		variationCardNode.hidden = false
		variationCardNode.setAttribute('aria-hidden', 'false')
		variationCardNode.classList.remove('is-revealed', 'is-flying-out')
		renderVariationFan()
		if (fromDragSnap) {
			variationCardNode.classList.remove('is-dragging', 'is-returning')
			variationCardNode.classList.add('is-snapping')
			setVariationVisualState('open-center')
			window.setTimeout(() => {
				variationCardNode.classList.remove('is-snapping')
			}, VARIATION_FLY_MS)
		} else {
			setVariationVisualState('peek')
			variationCardNode.getBoundingClientRect()
			window.setTimeout(() => {
				setVariationVisualState('flying-in')
				window.setTimeout(() => {
					if (state.miniCardOpen) {
						setVariationVisualState('open-center')
					}
				}, VARIATION_FLY_MS)
			}, 28)
		}

		createVariationScratch()
	}

	const refreshOpenVariationCard = (selectedIndex = 0) => {
		if (!variationCardNode || !variationTextNode || !state.hasVariations || state.variationChoices.length === 0) {
			closeVariationCard()
			return
		}
		const boundedIndex = Math.max(0, Math.min(selectedIndex, state.variationChoices.length - 1))
		const choice = state.variationChoices[boundedIndex]
		if (!choice?.text) {
			closeVariationCard()
			return
		}
		state.currentVariationText = choice.text
		state.activeVariationIndex = choice.index
		state.miniCardOpen = true
		state.canDismissVariation = true
		variationTextNode.textContent = choice.text
		applyVariationVisualTheme(choice.visual)
		variationCardNode.hidden = false
		variationCardNode.setAttribute('aria-hidden', 'false')
		variationCardNode.classList.remove('is-peek', 'is-flying-in', 'is-flying-out')
		variationCardNode.classList.add('is-open-center')
		renderVariationFan()
	}

	const setFlipRotation = (degrees) => {
		state.flipRotationDeg = degrees
		activeCard.style.setProperty('--flip-rot', `${degrees}deg`)
	}

	const updateTiltFromOrientation = (event) => {
		const beta = Number(event.beta ?? 0)
		const gamma = Number(event.gamma ?? 0)
		state.lastOrientationBeta = beta
		state.lastOrientationGamma = gamma

		if (!state.isMotionEnabled || state.isMotionSuspended) {
			return
		}

		if (state.motionBaselinePending) {
			setMotionBaseline(beta, gamma)
			return
		}

		const clampedBeta = clampOrientationSpike(beta, state.previousOrientationBeta)
		const clampedGamma = clampOrientationSpike(gamma, state.previousOrientationGamma)
		const timestamp = performance.now()
		const elapsed = Math.max(8, timestamp - (state.previousOrientationTimestamp || timestamp))
		const rawSpeed = Math.hypot(
			clampedBeta - (state.previousOrientationBeta ?? clampedBeta),
			clampedGamma - (state.previousOrientationGamma ?? clampedGamma)
		) / (elapsed / 16.667)
		state.previousOrientationBeta = clampedBeta
		state.previousOrientationGamma = clampedGamma
		state.previousOrientationTimestamp = timestamp

		const medianBeta = pushMedianSample(state.orientationBetaWindow, clampedBeta)
		const medianGamma = pushMedianSample(state.orientationGammaWindow, clampedGamma)

		const nextFilteredBeta = Number.isFinite(state.filteredOrientationBeta)
			? state.filteredOrientationBeta + (medianBeta - state.filteredOrientationBeta) * ORIENTATION_FILTER_ALPHA
			: medianBeta
		const nextFilteredGamma = Number.isFinite(state.filteredOrientationGamma)
			? state.filteredOrientationGamma + (medianGamma - state.filteredOrientationGamma) * ORIENTATION_FILTER_ALPHA
			: medianGamma
		state.filteredOrientationBeta = nextFilteredBeta
		state.filteredOrientationGamma = nextFilteredGamma

		const baselineBeta = Number.isFinite(state.motionBaselineBeta) ? state.motionBaselineBeta : beta
		const baselineGamma = Number.isFinite(state.motionBaselineGamma) ? state.motionBaselineGamma : gamma
		const deltaBeta = nextFilteredBeta - baselineBeta
		const deltaGamma = nextFilteredGamma - baselineGamma
		const baselineActivity = Math.hypot(deltaBeta, deltaGamma) * MOTION_BASELINE_ACTIVITY_FACTOR
		const activity = Math.max(rawSpeed, baselineActivity)
		if (state.motionSignalActive) {
			state.motionSignalActive = activity >= MOTION_ACTIVITY_OFF
		} else if (activity >= MOTION_ACTIVITY_ON) {
			state.motionSignalActive = true
		}
		const intent = state.motionSignalActive ? Math.min(1, activity / 1.55) : 0
		const activationAlpha = Math.min(1, Math.max(0, (performance.now() - state.motionActivatedAt) / 260))
		const targetMotionX = softClamp(deltaBeta * ORIENTATION_MOTION_X_DAMPING, MAX_MOTION_X) * activationAlpha
		const targetMotionY = softClamp(-deltaGamma * ORIENTATION_MOTION_Y_DAMPING, MAX_MOTION_Y) * activationAlpha
		const targetTiltX = softClamp(deltaBeta * ORIENTATION_TILT_X_DAMPING, MAX_TILT_X) * activationAlpha
		const targetTiltY = softClamp(-deltaGamma * ORIENTATION_TILT_Y_DAMPING, MAX_TILT_Y) * activationAlpha
		const targetTiltZ = softClamp(deltaGamma * TILT_Z_DAMPING, MAX_TILT_Z) * activationAlpha
		const gatedScale = state.motionSignalActive ? 1 : 0.2

		state.motionTargets.motionX = targetMotionX * gatedScale
		state.motionTargets.motionY = targetMotionY * gatedScale
		state.motionTargets.tiltX = targetTiltX * gatedScale
		state.motionTargets.tiltY = targetTiltY * gatedScale
		state.motionTargets.tiltZ = targetTiltZ * gatedScale
		state.motionTargetIntent = intent
		startMotionLoop()
	}

	const disableMotion = () => {
		state.isMotionEnabled = false
		state.isMotionSuspended = false
		state.motionPermissionState = 'denied'
		state.motionBaselineBeta = null
		state.motionBaselineGamma = null
		state.motionBaselinePending = false
		state.filteredOrientationBeta = null
		state.filteredOrientationGamma = null
		state.previousOrientationBeta = null
		state.previousOrientationGamma = null
		state.previousOrientationTimestamp = 0
		state.orientationBetaWindow = []
		state.orientationGammaWindow = []
		state.motionSignalActive = false
		state.motionTargetIntent = 0
		state.motionTargets = { motionX: 0, motionY: 0, tiltX: 0, tiltY: 0, tiltZ: 0 }
		state.motionActivatedAt = 0
		stopMotionLoop()
		state.motionX = 0
		state.motionY = 0
		state.tiltX = 0
		state.tiltY = 0
		state.tiltZ = 0
		applyMotionTransform()
		applyMotionVisualState()
		updateMotionButton('3D Motion deaktiviert', 'is-disabled', false)
		statusNode.textContent = '3D Motion wurde deaktiviert.'
	}

	const enableMotion = () => {
		state.isMotionEnabled = true
		state.isMotionSuspended = false
		state.motionPermissionState = 'granted'
		state.motionActivatedAt = performance.now()
		setMotionBaseline(state.lastOrientationBeta, state.lastOrientationGamma)
		startMotionLoop()
		applyMotionVisualState()
		statusNode.textContent = '3D Motion ist aktiv.'
		updateMotionButton('3D Motion aktiv', 'is-active', true)
	}

	const suspendMotionForTransition = () => {
		if (!state.isMotionEnabled) {
			return false
		}

		state.isMotionSuspended = true
		state.isMotionEnabled = false
		state.motionX = 0
		state.motionY = 0
		state.tiltX = 0
		state.tiltY = 0
		state.tiltZ = 0
		state.filteredOrientationBeta = null
		state.filteredOrientationGamma = null
		state.previousOrientationBeta = null
		state.previousOrientationGamma = null
		state.previousOrientationTimestamp = 0
		state.orientationBetaWindow = []
		state.orientationGammaWindow = []
		state.motionSignalActive = false
		state.motionTargetIntent = 0
		state.motionTargets = { motionX: 0, motionY: 0, tiltX: 0, tiltY: 0, tiltZ: 0 }
		stopMotionLoop()
		applyMotionTransform()
		applyMotionVisualState()
		updateMotionButton('3D Motion', '', false)
		return true
	}

	const resumeMotionAfterTransition = () => {
		if (state.motionPermissionState !== 'granted') {
			state.isMotionSuspended = false
			return
		}

		state.isMotionSuspended = false
		state.isMotionEnabled = true
		startMotionLoop()
		applyMotionVisualState()
		updateMotionButton('3D Motion aktiv', 'is-active', true)
	}

	const requestMotionPermission = async () => {
		if (!motionToggle || state.motionPermissionState === 'granted') {
			return
		}

		updateMotionButton('3D Motion...', '', false)

		try {
			if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
				const permission = await DeviceOrientationEvent.requestPermission()
				if (permission !== 'granted') {
					disableMotion()
					return
				}
			}

			enableMotion()
		} catch (error) {
			console.error(error)
			disableMotion()
		}
	}

	const toggleMotion = async () => {
		if (!motionToggle) return
		if (state.isMotionEnabled) {
			disableMotion()
			return
		}
		if (state.motionPermissionState === 'granted') {
			enableMotion()
			return
		}
		await requestMotionPermission()
	}

	const fitQuestionText = () => {
		if (state.fitFrame) {
			cancelAnimationFrame(state.fitFrame)
		}

		state.fitFrame = requestAnimationFrame(() => {
			const shell = questionNode.parentElement
			if (!shell) {
				return
			}

			const maxSize = 34
			const minSize = 18
			let bestSize = minSize
			let low = minSize
			let high = maxSize

			questionNode.style.fontSize = `${maxSize}px`

			while (low <= high) {
				const mid = Math.floor((low + high) / 2)
				questionNode.style.fontSize = `${mid}px`

				if (questionNode.scrollHeight <= shell.clientHeight + 2) {
					bestSize = mid
					low = mid + 1
				} else {
					high = mid - 1
				}
			}

			questionNode.style.fontSize = `${bestSize}px`
		})
	}

	const updateDeckLabels = () => {
		if (statusNode) {
			statusNode.textContent = ''
		}
	}

	const buildDrawPile = (excludeId) => {
		const filteredCards = getFilteredCards()
		state.drawPile = shuffle(filteredCards.filter((card) => card.id !== excludeId))
	}

	const setPreviewCards = () => {
		const previewCards = state.drawPile.slice(0, stackCards.length)

		stackCards.forEach((stackCard, index) => {
			const preview = previewCards[index]
			const theme = preview ? (CATEGORY_STYLES[preview.categoryKey] || CATEGORY_STYLES.default) : CATEGORY_STYLES.default

			stackCard.className = `stack-card stack-card--${index} ${preview ? 'is-visible' : ''}`
			stackCard.style.setProperty('--card-top', theme.top)
			stackCard.style.setProperty('--card-bottom', theme.bottom)
			stackCard.style.setProperty('--accent', theme.accent)

			if (!preview) {
				stackCard.innerHTML = ''
				return
			}

			stackCard.innerHTML = `
				<div class="stack-card__inner">
					<span class="stack-card__badge">${theme.label}</span>
					<p class="stack-card__question">${getCardQuestion(preview)}</p>
				</div>
			`
		})
	}

		const renderCard = (card, options = {}) => {
			const { resetFlip = true, resetAnswerForm = true, preserveVariation = false } = options
			const shouldPreserveOpenVariation = preserveVariation && state.miniCardOpen
			const preservedVariationIndex = Number.isInteger(state.activeVariationIndex) && state.activeVariationIndex >= 0
				? state.activeVariationIndex
				: 0
			const theme = CATEGORY_STYLES[card.categoryKey] || CATEGORY_STYLES.default
			const unifiedColor = theme.coreColor || theme.logoColor || theme.patternColorA || theme.accent
			if (categoryLabel) {
				categoryLabel.textContent = card.categoryLabel || theme.label || ''
				categoryLabel.style.display = card.categoryLabel ? '' : 'none'
			}
				if (frontQuestionNode) {
					frontQuestionNode.textContent = getCardQuestion(card)
					frontQuestionNode.style.color = theme.questionShellText || '#111111'
				}
				const kombiWords = getKombiWords(card)
				const showKombiWords = card.categoryKey === 'kombichaos' && (kombiWords.wordOne || kombiWords.wordTwo)
				if (kombiWordsNode) {
					kombiWordsNode.hidden = !showKombiWords
					kombiWordsNode.setAttribute('aria-hidden', showKombiWords ? 'false' : 'true')
				}
				if (kombiWordOneNode) {
					kombiWordOneNode.textContent = kombiWords.wordOne || '—'
				}
				if (kombiWordTwoNode) {
					kombiWordTwoNode.textContent = kombiWords.wordTwo || '—'
				}
				if (frontQuestionShellNode) {
					frontQuestionShellNode.style.backgroundColor = theme.questionShellBg || '#ffffff'
					frontQuestionShellNode.style.borderColor = theme.questionShellBorder || 'rgba(0, 0, 0, 0.22)'
				}
			if (cardBackLogoNode) {
				cardBackLogoNode.setAttribute('aria-label', `${theme.label} logo`)
			}
			if (cardBackOrbitTextNodes.length > 0) {
				cardBackOrbitTextNodes.forEach((node) => {
					node.textContent = theme.label
				})
			}
			activeCard.style.setProperty('--card-top', theme.top)
			activeCard.style.setProperty('--card-bottom', theme.bottom)
			activeCard.style.setProperty('--accent', theme.accent)
			activeCard.style.setProperty('--card-text', theme.text)
			activeCard.style.setProperty('--card-pattern-url', `url("${theme.patternSrc}")`)
			activeCard.style.setProperty('--back-circle-a', unifiedColor)
			activeCard.style.setProperty('--back-circle-b', theme.patternColorB)
			activeCard.style.setProperty('--back-orbit-color', unifiedColor)
			activeCard.style.setProperty('--back-logo-tone', unifiedColor)
			activeCard.style.setProperty('--back-logo-src', `url("${theme.logoSrc}")`)
			activeCard.style.setProperty('--back-fill-tone', theme.circleFillColor || theme.patternColorA)

			setTheme(card)
			updateLanguageButton()
			updateAnswerLabels()
			updateDeckLabels()
			setPreviewCards()
			if (resetAnswerForm) {
				resetAnswerComposer()
			} else {
				updateAnswerSubmitState()
			}
			renderLeaderboard(card.id)
			fitQuestionText()
			const cardVariations = getCardVariations(card)
			buildVariationChoices(card)
			const hasVariations = cardVariations.length > 0
			if (hasVariations && state.variationChoices.length > 0) {
				applyVariationVisualTheme(state.variationChoices[0].visual)
			}
			setVariationTabVisibility(hasVariations)
			if (shouldPreserveOpenVariation && hasVariations) {
				refreshOpenVariationCard(preservedVariationIndex)
			} else {
				closeVariationCard()
			}
			if (resetFlip) {
				applyMicrofacetTexture()
				// New cards start on the logo side ("back side"), then flip to reveal the question side.
				setFlipClass(true)
				setFlipRotation(180)
				scheduleFlipCue()
				scheduleSwipeUpCue()
			}
	}

	const toggleLanguage = async () => {
		const prevLanguage = state.language
		const newLanguage = prevLanguage === 'en' ? 'de' : 'en'

		// update UI language state first
		state.language = newLanguage
		persistLanguage()
		updateLanguageButton()
		updateAnswerLabels()
		renderRulesContent()

		// If there's no current card, just update labels
		if (!state.currentCard) {
			return
		}

		// Attempt to translate the currently displayed card via API
		try {
			const payload = {
				question: String(getCardQuestion(state.currentCard) || ''),
				language: String(prevLanguage || 'de')
			}
			const { key: apiKey, headerName: apiKeyHeaderName } = getClientApiKeyAndHeader()
			const headers = { 'Content-Type': 'application/json' }
			if (apiKey) headers[apiKeyHeaderName] = apiKey

			const resp = await fetch(`https://myfirstapi-slcb.onrender.com/api/v2/questions/translation/`, {
				method: 'POST',
				headers,
				body: JSON.stringify(payload)
			})
			if (resp.ok) {
				const json = await resp.json()
				const q = json && (json.question || json.question_text || json) ? (json.question || json) : null
				if (q && typeof q === 'object') {
					// apply translated fields into the currently displayed card
					const translated = {
						question: String(q.question || ''),
						wordOne: String(q.word1 || ''),
						wordTwo: String(q.word2 || ''),
						variationsClean: Array.isArray(q.variations) ? q.variations.map((v) => v) : [],
						variationAmount: Number.isFinite(Number(q.variation_amount)) ? Number(q.variation_amount) : (Array.isArray(q.variations) ? q.variations.length : 0),
						categoryLabel: String(q.category || state.currentCard.categoryLabel || ''),
						categoryKey: normalizeCategory(q.category || state.currentCard.categoryLabel || '')
					}
					Object.assign(state.currentCard, translated)
					// re-render the active card with preserved state
					renderCard(state.currentCard, { resetFlip: false, resetAnswerForm: false, preserveVariation: true })
				}
			}
		} catch (error) {
			console.warn('Übersetzung fehlgeschlagen, nur UI-Sprache gewechselt.', error)
		}

		// Refresh the queued cards from /cards for the new language
		try {
			const prevCards = Array.isArray(state.cards) ? state.cards.slice() : []
			const { key: apiKey2, headerName: apiKeyHeaderName2 } = getClientApiKeyAndHeader()
			const headers2 = { 'Content-Type': 'application/json' }
			if (apiKey2) headers2[apiKeyHeaderName2] = apiKey2
			const codeParam = newLanguage === 'en' ? 'en' : 'de'
			const cardsResp = await fetch(`${API_BASE}/cards?code=${encodeURIComponent(codeParam)}`, { headers: headers2 })
			if (cardsResp.ok) {
				const cardsJson = await cardsResp.json()
				const rawCards = Array.isArray(cardsJson.cards) ? cardsJson.cards : (Array.isArray(cardsJson) ? cardsJson : [])
				const newCards = toCards(rawCards)

				// Preserve variation presence from previous queue for matching ids
				newCards.forEach((nc) => {
					const prev = prevCards.find((pc) => pc && pc.id === nc.id)
					if (prev) {
						// copy only the variation-related fields to keep presence identical
						if (Array.isArray(prev.variationsClean)) {
							nc.variationsClean = prev.variationsClean.slice()
						}
						if (Number.isFinite(Number(prev.variationAmount))) {
							nc.variationAmount = Number(prev.variationAmount)
						}
					}
				})

				// try to preserve the current card position by matching id
				const currentId = state.currentCard && state.currentCard.id ? state.currentCard.id : null
				if (currentId) {
					const idx = newCards.findIndex((c) => c.id === currentId)
					if (idx >= 0) {
						// merge translated fields into the refreshed card entry but keep variation flags from prev
						const prev = prevCards.find((pc) => pc && pc.id === currentId)
						const merged = Object.assign({}, newCards[idx], state.currentCard)
						if (prev) {
							if (Array.isArray(prev.variationsClean)) merged.variationsClean = prev.variationsClean.slice()
							if (Number.isFinite(Number(prev.variationAmount))) merged.variationAmount = Number(prev.variationAmount)
						}
						newCards[idx] = merged
						state.cards = newCards
						state.currentCard = merged
						buildDrawPile(state.currentCard.id)
						setPreviewCards()
						updateDeckLabels()
						return
					}
				}

				// if no matching id, replace the whole queue and keep currentCard as-is (but ensure it's present)
				state.cards = newCards
				const exists = newCards.some((c) => c.id === currentId)
				if (!exists && state.currentCard) {
					// insert current at front of queue to keep it visible
					state.cards.unshift(state.currentCard)
				}
				buildDrawPile(state.currentCard.id)
				setPreviewCards()
				updateDeckLabels()
			}
		} catch (error) {
			console.warn('Karten-Refresh nach Sprachwechsel fehlgeschlagen.', error)
		}
	}

	const startFromRandomCard = () => {
		const filteredCards = getFilteredCards()
		if (filteredCards.length === 0) {
			state.currentCard = null
			state.drawPile = []
			questionNode.textContent = 'Keine Karten mit den aktuellen Filtern.'
			categoryLabel.textContent = 'Filter'
			resetAnswerComposer()
			renderLeaderboard('')
			setVariationTabVisibility(false)
			closeVariationCard()
			updateDeckLabels()
			setPreviewCards()
			return
		}

		const randomIndex = Math.floor(Math.random() * filteredCards.length)
		state.currentCard = filteredCards[randomIndex]
		buildDrawPile(state.currentCard.id)
		renderCard(state.currentCard)
		saveGameSession()
		triggerSpawnAnimation()
	}

	const applyFilters = ({ keepCurrent = true } = {}) => {
		const previousCard = keepCurrent ? state.currentCard : null
		const filteredCards = getFilteredCards()

		if (filteredCards.length === 0) {
			state.currentCard = null
			state.drawPile = []
			questionNode.textContent = 'Keine Karten mit den aktuellen Filtern.'
			categoryLabel.textContent = 'Filter'
			resetAnswerComposer()
			renderLeaderboard('')
			setVariationTabVisibility(false)
			closeVariationCard()
			updateDeckLabels()
			setPreviewCards()
			return
		}

		const currentStillValid = previousCard && filteredCards.some((card) => card.id === previousCard.id)
		if (currentStillValid) {
			state.currentCard = previousCard
			buildDrawPile(previousCard.id)
			renderCard(previousCard, { resetFlip: false })
			return
		}

		const nextIndex = Math.floor(Math.random() * filteredCards.length)
		state.currentCard = filteredCards[nextIndex]
		buildDrawPile(state.currentCard.id)
		renderCard(state.currentCard)
		saveGameSession()
		triggerSpawnAnimation()
	}

	const resetCardPosition = () => {
		activeCard.classList.remove('is-dragging', 'is-leaving')
		const target = activeCard
		target.style.setProperty('--drag-x', '0px')
		target.style.setProperty('--drag-y', '0px')
		target.style.setProperty('--drag-rot', '0deg')
		activeCard.style.opacity = ''
		activeCard.style.filter = ''
		state.dragOffsetX = 0
		state.dragOffsetY = 0
		state.isDragging = false
		applyMotionTransform()
		scheduleSwipeUpCue()
	}

	const settleCardPositionAfterFlip = () => {
		activeCard.classList.remove('is-dragging')
		state.isDragging = false
		state.dragOffsetX = 0
		state.dragOffsetY = 0
		activeCard.style.setProperty('--drag-x', '0px')
		activeCard.style.setProperty('--drag-y', '0px')
		activeCard.style.setProperty('--drag-rot', '0deg')
		applyMotionTransform()
		scheduleSwipeUpCue()
	}

	const clearSpawnAnimation = () => {
		activeCard.classList.remove('is-spawning')
		if (state.spawnAnimationTimer) {
			clearTimeout(state.spawnAnimationTimer)
			state.spawnAnimationTimer = null
		}
	}

	const triggerSpawnAnimation = () => {
		// Spawn contract: animation runs on `.active-card__tilt` so it does not fight card movement transforms.
		clearSpawnAnimation()
		activeCard.classList.add('is-spawning')

		const onSpawnAnimationEnd = (event) => {
			if (event.currentTarget !== activeCard || event.animationName !== 'card-spawn-fly') {
				return
			}

			activeCard.removeEventListener('animationend', onSpawnAnimationEnd)
			clearSpawnAnimation()
		}

		activeCard.addEventListener('animationend', onSpawnAnimationEnd)
		state.spawnAnimationTimer = window.setTimeout(() => {
			activeCard.removeEventListener('animationend', onSpawnAnimationEnd)
			clearSpawnAnimation()
		}, 1100)
	}

	const advanceCard = () => {
		if (state.isAnimating || state.enterAnimationActive || !state.currentCard) {
			return
		}

		hideFlipCue()
		hideSwipeUpCue()
		state.hasSwipedUpOnce = true
		const motionWasActive = suspendMotionForTransition()

		if (state.drawPile.length === 0) {
			buildDrawPile(state.currentCard.id)
			setPreviewCards()
		}

		const nextCard = state.drawPile.shift()
		if (!nextCard) {
			resetCardPosition()
			return
		}

		state.isAnimating = true
		state.enterAnimationActive = true
		const deckStage = document.querySelector('[data-deck-stage]') || app
		const leavingClone = activeCard.cloneNode(true)
		let enterTransitionFinished = false
		let enterFallbackTimer = null

		leavingClone.removeAttribute('data-active-card')
		leavingClone.removeAttribute('data-card-shell')
		leavingClone.setAttribute('aria-hidden', 'true')
		leavingClone.classList.add('card-transition-clone')
		deckStage.appendChild(leavingClone)

		activeCard.style.visibility = 'hidden'
		activeCard.style.opacity = ''
		activeCard.style.filter = ''
		activeCard.style.setProperty('--drag-x', '0px')
		activeCard.style.setProperty('--drag-y', '0px')
		activeCard.style.setProperty('--drag-rot', '0deg')

		renderCard(nextCard)

		const finishEnterTransition = () => {
			if (enterTransitionFinished) {
				return
			}

			enterTransitionFinished = true
			if (enterFallbackTimer) {
				clearTimeout(enterFallbackTimer)
				enterFallbackTimer = null
			}
			activeCard.style.opacity = ''
			activeCard.style.filter = ''
			activeCard.style.visibility = ''
			leavingClone.remove()
			state.currentCard = nextCard
			updateLanguageButton()
			updateDeckLabels()
			setPreviewCards()
			fitQuestionText()
			saveGameSession()
			state.isAnimating = false
			state.enterAnimationActive = false
			scheduleSwipeUpCue()
			if (motionWasActive) {
				setTimeout(() => resumeMotionAfterTransition(), 40)
			}
		}

		leavingClone.getBoundingClientRect()
		leavingClone.classList.add('is-leaving')
		activeCard.style.visibility = ''
		activeCard.getBoundingClientRect()
		window.requestAnimationFrame(() => {
			triggerSpawnAnimation()
		})
		enterFallbackTimer = window.setTimeout(finishEnterTransition, 660)
	}

	const onTouchStart = (event) => {
		if (event.currentTarget !== activeCard || state.isAnimating || !event.touches || event.touches.length !== 1) {
			return
		}
		if (isAnswerInteractionTarget(event.target)) {
			return
		}
		if (state.miniCardOpen && variationCardNode && variationCardNode.contains(event.target)) {
			return
		}
		const touch = event.touches[0]
		state.isDragging = true
		state.touchStartX = touch.clientX
		state.touchStartY = touch.clientY
		state.lastTouchX = touch.clientX
		state.lastTouchY = touch.clientY
		state.touchStartTime = performance.now()
		clearSpawnAnimation()
		hideFlipCue()
		hideSwipeUpCue()
		activeCard.classList.add('is-dragging')
	}

	const onTouchMove = (event) => {
		if (event.currentTarget !== activeCard || !state.isDragging || state.isAnimating || !event.touches || event.touches.length !== 1) {
			return
		}

		const touch = event.touches[0]
		state.lastTouchX = touch.clientX
		state.lastTouchY = touch.clientY

		const deltaX = touch.clientX - state.touchStartX
		const deltaY = touch.clientY - state.touchStartY
		const dragDistance = Math.max(0, -deltaY)
		state.dragOffsetX = deltaX
		state.dragOffsetY = deltaY

		event.preventDefault()

		const rotation = Math.max(-MAX_DRAG_ROTATION, Math.min(MAX_DRAG_ROTATION, deltaX * 0.02 - dragDistance * 0.03))
		const target = activeCard
		target.style.setProperty('--drag-x', `${deltaX * 0.08}px`)
		target.style.setProperty('--drag-y', `${deltaY}px`)
		target.style.setProperty('--drag-rot', `${rotation}deg`)
		applyMotionTransform()
	}

	const bindCardShell = (shell) => {
		if (!shell) {
			return
		}

		shell.addEventListener('touchstart', onTouchStart, { passive: true })
		shell.addEventListener('touchmove', onTouchMove, { passive: false })
		shell.addEventListener('touchend', onTouchEnd)
		shell.addEventListener('touchcancel', resetCardPosition)
	}

	const bindVariationInteractions = () => {
		if (!variationCardNode) {
			return
		}

		const onVariationTeaserDragStart = (x, y, pointerId = null) => {
			if (!canDragVariationTeaser()) {
				return false
			}
			state.variationTeaserDragging = true
			state.variationTeaserPointerId = pointerId
			state.variationTeaserDragStartX = x
			state.variationTeaserDragStartY = y
			state.variationTeaserDragProgress = 0
			variationCardNode.classList.remove('is-returning', 'is-snapping')
			variationCardNode.classList.add('is-dragging')
			return true
		}

			const onVariationTeaserDragMove = (x, y) => {
				if (!state.variationTeaserDragging) {
					return
				}
				const deltaX = x - state.variationTeaserDragStartX
				const deltaY = y - state.variationTeaserDragStartY
				const distance = Math.hypot(deltaX, deltaY)
				applyVariationTeaserDrag(deltaX, deltaY)
				state.variationTeaserDragProgress = Math.min(1, distance / VARIATION_DRAG_OPEN_DISTANCE)
				if (distance > VARIATION_DRAG_DEADZONE) {
					setVariationTeaserSuppressClick()
				}
			}

		const onVariationTeaserDragEnd = () => {
			if (!state.variationTeaserDragging) {
				return
			}
				const shouldSnapOpen = state.variationTeaserDragProgress >= VARIATION_DRAG_SNAP_PROGRESS || isVariationTeaserNearCenter()
				variationCardNode.classList.remove('is-dragging')
				state.variationTeaserDragging = false
				state.variationTeaserPointerId = null
			state.variationTeaserDragStartX = 0
			state.variationTeaserDragStartY = 0
			state.variationTeaserDragProgress = 0

				if (shouldSnapOpen) {
					setVariationTeaserSuppressClick()
					const selectedIndex = Number.isInteger(state.activeVariationIndex) && state.activeVariationIndex >= 0
						? state.activeVariationIndex
						: 0
					if (!state.miniCardOpen) {
						openVariationCard(selectedIndex, { fromDragSnap: true })
					}
					return
				}

			resetVariationTeaserDrag({ animate: true })
		}

		const onVariationDismissTouchStart = (event) => {
			if (!state.miniCardOpen || !variationCardNode.classList.contains('is-open-center')) {
				return
			}
			if (!event.touches || event.touches.length !== 1) {
				return
			}
			state.variationDismissStartX = event.touches[0].clientX
			state.variationDismissStartY = event.touches[0].clientY
		}

		const onVariationDismissTouchEnd = (event) => {
			if (!state.miniCardOpen || !variationCardNode.classList.contains('is-open-center')) {
				return
			}
			if (!event.changedTouches || event.changedTouches.length !== 1) {
				return
			}
			const deltaX = event.changedTouches[0].clientX - state.variationDismissStartX
			const deltaY = event.changedTouches[0].clientY - state.variationDismissStartY
			const isSwipeRight = deltaX > VARIATION_DISMISS_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY) * 1.1
			if (isSwipeRight) {
				event.preventDefault()
				dismissVariationCard()
			}
		}

		const onVariationTouchStart = (event) => {
			if (!event.touches || event.touches.length !== 1) {
				return
			}
			const touch = event.touches[0]
			onVariationTeaserDragStart(touch.clientX, touch.clientY)
		}

		const onVariationTouchMove = (event) => {
			if (!state.variationTeaserDragging || !event.touches || event.touches.length !== 1) {
				return
			}
			const touch = event.touches[0]
			onVariationTeaserDragMove(touch.clientX, touch.clientY)
			event.preventDefault()
		}

		const onVariationTouchEndDrag = () => {
			onVariationTeaserDragEnd()
		}

		const onVariationPointerDown = (event) => {
			if (event.pointerType === 'touch') {
				return
			}
			if (onVariationTeaserDragStart(event.clientX, event.clientY, event.pointerId)) {
				event.preventDefault()
			}
		}

		const onVariationPointerMove = (event) => {
			if (!state.variationTeaserDragging || state.variationTeaserPointerId !== event.pointerId) {
				return
			}
			onVariationTeaserDragMove(event.clientX, event.clientY)
		}

		const onVariationPointerEnd = (event) => {
			if (state.variationTeaserPointerId !== event.pointerId) {
				return
			}
			onVariationTeaserDragEnd()
		}

		variationCardNode.addEventListener('touchstart', onVariationTouchStart, { passive: true })
		variationCardNode.addEventListener('touchmove', onVariationTouchMove, { passive: false })
		variationCardNode.addEventListener('touchend', onVariationTouchEndDrag)
		variationCardNode.addEventListener('touchcancel', onVariationTouchEndDrag)
		variationCardNode.addEventListener('touchstart', onVariationDismissTouchStart, { passive: true })
		variationCardNode.addEventListener('touchend', onVariationDismissTouchEnd)
		variationCardNode.addEventListener('pointerdown', onVariationPointerDown)
		variationCardNode.addEventListener('pointermove', onVariationPointerMove)
		variationCardNode.addEventListener('pointerup', onVariationPointerEnd)
		variationCardNode.addEventListener('pointercancel', onVariationPointerEnd)
		variationCardNode.addEventListener('click', (event) => {
			if (state.variationTeaserSuppressClick) {
				event.preventDefault()
				event.stopPropagation()
				clearVariationTeaserSuppressClick()
				return
			}
			event.preventDefault()
			event.stopPropagation()
			if (!state.miniCardOpen) {
				openVariationCard(0)
				return
			}
			dismissVariationCard()
		})
		variationFanNode?.addEventListener('click', (event) => {
			const target = event.target instanceof Element ? event.target.closest('[data-variation-index]') : null
			if (!target) {
				return
			}
			event.preventDefault()
			event.stopPropagation()
			const selectedIndex = Number.parseInt(target.getAttribute('data-variation-index') || '-1', 10)
			if (!Number.isInteger(selectedIndex) || selectedIndex < 0) {
				return
			}
			openVariationCard(selectedIndex)
		})
		// Do not stop propagation on the scratch host itself:
		// p5 touch callbacks rely on bubbling in Safari/Chrome mobile.
	}

	const bindAnswerInteractions = () => {
		if (!answerComposerNode) {
			return
		}
		const stopAnswerGesture = (event) => {
			event.stopPropagation()
		}
		answerComposerNode.addEventListener('touchstart', stopAnswerGesture, { passive: true })
		answerComposerNode.addEventListener('touchmove', stopAnswerGesture, { passive: false })
		answerComposerNode.addEventListener('touchend', stopAnswerGesture)
		answerComposerNode.addEventListener('pointerdown', stopAnswerGesture)
		answerComposerNode.addEventListener('pointermove', stopAnswerGesture)
		answerComposerNode.addEventListener('pointerup', stopAnswerGesture)
		answerComposerNode.addEventListener('click', stopAnswerGesture)

		answerToggleNode?.addEventListener('click', () => {
			hideSwipeUpCue()
			setAnswerComposerOpen(!state.answerComposerOpen)
		})
		answerCancelNode?.addEventListener('click', () => {
			setAnswerComposerOpen(false)
		})
		answerUsernameNode?.addEventListener('input', updateAnswerSubmitState)
		answerTextNode?.addEventListener('input', updateAnswerSubmitState)
		answerLeaderboardToggleNode?.addEventListener('click', () => {
			setLeaderboardOpen(!state.answerLeaderboardOpen)
		})
		answerFormNode?.addEventListener('submit', async (event) => {
			event.preventDefault()
			if (!state.currentCard || !answerUsernameNode || !answerTextNode) {
				return
			}
			const username = answerUsernameNode.value.trim()
			const answer = answerTextNode.value.trim()
			if (!username || !answer) {
				updateAnswerSubmitState()
				return
			}
			const copy = getAnswerCopy()
			answerSubmitNode.disabled = true
			answerSubmitNode.textContent = copy.submitting
			if (answerStatusNode) {
				answerStatusNode.textContent = copy.submitting
			}
			try {
				await createAnswerSubmission({
					cardId: state.currentCard.id,
					question: getCardQuestion(state.currentCard),
					category: state.currentCard.categoryKey,
					username,
					answer
				})
				answerTextNode.value = ''
				updateAnswerSubmitState()
				renderLeaderboard(state.currentCard.id)
				if (answerStatusNode) {
					answerStatusNode.textContent = copy.success
				}
				if (state.answerSuccessTimer) {
					clearTimeout(state.answerSuccessTimer)
				}
				state.answerSuccessTimer = window.setTimeout(() => {
					if (answerStatusNode) {
						answerStatusNode.textContent = ''
					}
					state.answerSuccessTimer = null
				}, 1800)
			} catch (error) {
				console.error(error)
				if (answerStatusNode) {
					answerStatusNode.textContent = copy.error
				}
			} finally {
				answerSubmitNode.textContent = getAnswerCopy().submit
				updateAnswerSubmitState()
			}
		})
	}

	const onTouchEnd = (event) => {
		if (!state.isDragging || state.isAnimating) {
			return
		}

		if (event?.changedTouches && event.changedTouches.length === 1) {
			state.lastTouchX = event.changedTouches[0].clientX
			state.lastTouchY = event.changedTouches[0].clientY
		}

		const elapsed = Math.max(1, performance.now() - state.touchStartTime)
		const deltaX = state.lastTouchX - state.touchStartX
		const deltaY = state.lastTouchY - state.touchStartY
		const velocityX = Math.abs(deltaX) / elapsed
		const velocityY = Math.abs(deltaY) / elapsed
		const isUpwardSwipe = deltaY < -SWIPE_DISTANCE && Math.abs(deltaY) > Math.abs(deltaX) * SWIPE_RATIO
		const isFastFlick = deltaY < -40 && velocityY > SWIPE_VELOCITY
		const isHorizontalLeft = deltaX < -SWIPE_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_RATIO
		const isHorizontalRight = deltaX > SWIPE_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_RATIO
		const isHorizontalFlickLeft = deltaX < -38 && velocityX > SWIPE_VELOCITY && Math.abs(deltaX) > Math.abs(deltaY) * 0.9
		const isHorizontalFlickRight = deltaX > 38 && velocityX > SWIPE_VELOCITY && Math.abs(deltaX) > Math.abs(deltaY) * 0.9

		if (isUpwardSwipe || isFastFlick) {
			advanceCard()
			return
		}

		if (isHorizontalLeft || isHorizontalRight || isHorizontalFlickLeft || isHorizontalFlickRight) {
			const direction = (isHorizontalLeft || isHorizontalFlickLeft) ? 'left' : 'right'
			activeCard.classList.remove('is-dragging')
			state.isDragging = false
			flipCard(direction)
			window.requestAnimationFrame(() => settleCardPositionAfterFlip())
			return
		}

		resetCardPosition()
	}

	const flipCard = (direction) => {
		if (state.isAnimating) return

		const motionWasActive = suspendMotionForTransition()
		const normalizedDirection = direction === 'left' ? 'left' : 'right'
		const nextRotation = state.flipRotationDeg + (normalizedDirection === 'left' ? -180 : 180)
		setFlipRotation(nextRotation)
		hideFlipCue()
		state.hasFlippedCardOnce = true

		// toggle flipped state
		setFlipClass(!state.isFlipped)
		saveGameSession()

		if (motionWasActive) {
			window.setTimeout(() => resumeMotionAfterTransition(), 420)
		}
	}

	const onKeyDown = (event) => {
		const target = event.target
		const isTypingTarget = target instanceof Element && (
			target.matches('input, textarea, select, button') ||
			target.closest('[data-answer-composer]')
		)
		if (isTypingTarget) {
			return
		}

		if (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === ' ') {
			event.preventDefault()
			advanceCard()
			return
		}

		// Left / Right to flip the card
		if (event.key === 'ArrowLeft') {
			event.preventDefault()
			flipCard('left')
			return
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault()
			flipCard('right')
			return
		}
	}

	const bindEvents = () => {
		bindCardShell(activeCard)
		bindVariationInteractions()
		bindAnswerInteractions()
		motionToggle?.addEventListener('click', toggleMotion)
		languageToggle?.addEventListener('click', toggleLanguage)
		filterToggle?.addEventListener('click', () => {
			setFilterMenuOpen(!state.filterMenuOpen)
		})
		// category inputs are created dynamically after cards load; attach delegated handler
		if (filterMenu) {
			filterMenu.addEventListener('change', (event) => {
				const target = event.target
				if (!(target instanceof HTMLInputElement) || !target.dataset.filterCategory) return
				const inputs = Array.from(filterMenu.querySelectorAll('input[data-filter-category]'))
				const enabled = inputs.filter((node) => node.checked).map((node) => String(node.dataset.filterCategory || '')).filter(Boolean)
				state.enabledCategories = new Set(enabled)
				applyFilters({ keepCurrent: true })
			})
		}
		filterVariationsOnlyInput?.addEventListener('change', () => {
			state.variationsOnly = !!filterVariationsOnlyInput.checked
			applyFilters({ keepCurrent: true })
		})
		rulesToggle?.addEventListener('click', () => {
			setRulesOpen(!state.rulesOpen)
		})
		rulesCloseNode?.addEventListener('click', () => {
			setRulesOpen(false)
		})
		document.addEventListener('click', (event) => {
			if (!state.filterMenuOpen || !filterMenu || !filterToggle) {
				return
			}
			if (filterMenu.contains(event.target) || filterToggle.contains(event.target)) {
				return
			}
			setFilterMenuOpen(false)
		})
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('resize', () => {
			fitQuestionText()
			scheduleLeaderboardParallax()
		})
		answerLeaderboardListNode?.addEventListener('scroll', scheduleLeaderboardParallax, { passive: true })
		window.addEventListener('deviceorientation', updateTiltFromOrientation)
		window.addEventListener('pointermove', updateTiltFromPointer)
	}

	const initialize = async () => {
		try {
			setLoadingState(true)
			applyPageEntryTransition()
			state.language = loadStoredLanguage()
			// enabled categories will be populated after loading cards
			state.enabledCategories = new Set()
			state.variationsOnly = !!filterVariationsOnlyInput?.checked
			setFilterMenuOpen(false)

			let storedSpawnMotionMode = 'on'
			try {
				const rawSpawnMotionMode = window.localStorage.getItem(SPAWN_MOTION_STORAGE_KEY)
				storedSpawnMotionMode = rawSpawnMotionMode === 'auto'
					? 'on'
					: normalizeSpawnMotionMode(rawSpawnMotionMode)
			} catch (error) {
				storedSpawnMotionMode = 'on'
			}
			applySpawnMotionMode(storedSpawnMotionMode, true)

			const data = await getData()
			state.cards = toCards(Array.isArray(data.cards) ? data.cards : [])
			// build dynamic filter options from loaded card categories
			try {
				if (filterMenu) {
					// remove existing category option nodes (keep title and divider)
					const divider = filterMenu.querySelector('.filter-menu__divider')
					Array.from(filterMenu.querySelectorAll('.filter-menu__option')).forEach((node) => node.remove())
					// insert category options before divider
					const insertBefore = divider || null
					const categories = []
					const seen = new Set()
					state.cards.forEach((c) => {
						if (!seen.has(c.categoryKey)) {
							seen.add(c.categoryKey)
							categories.push({ key: c.categoryKey, label: c.categoryLabel })
						}
					})
					categories.forEach((cat) => {
						const label = document.createElement('label')
						label.className = 'filter-menu__option'
						const input = document.createElement('input')
						input.type = 'checkbox'
						input.dataset.filterCategory = cat.key
						input.checked = true
						const span = document.createElement('span')
						span.textContent = cat.label
						label.appendChild(input)
						label.appendChild(span)
						filterMenu.insertBefore(label, insertBefore)
					})
					// initialize enabled categories
					state.enabledCategories = new Set(categories.map((c) => c.key))
				}
			} catch (e) {
				console.warn('Filter-Menü konnte nicht dynamisch aufgebaut werden.', e)
			}

			if (state.cards.length === 0) {
				throw new Error('Keine Karten gefunden.')
			}

				const savedSession = loadGameSession()
				const filteredCards = getFilteredCards()
				const savedCard = savedSession
					? filteredCards.find((card) => card.id === savedSession.currentCardId)
					: null
				if (savedCard) {
					state.currentCard = savedCard
					const cardsById = new Map(state.cards.map((card) => [card.id, card]))
					state.drawPile = savedSession.drawPileIds
						.map((id) => cardsById.get(id))
						.filter((card) => card && card.id !== savedCard.id)
					if (state.drawPile.length === 0) {
						buildDrawPile(savedCard.id)
					}
					renderCard(savedCard, { resetFlip: false })
					setFlipClass(savedSession.isFlipped)
					setFlipRotation(savedSession.flipRotationDeg)
					saveGameSession()
				} else {
					startFromRandomCard()
				}
				setLoadingState(false)
				bindEvents()
				updateMotionButton('3D Motion', '', false)
				applyMotionVisualState()
				updateLanguageButton()
				renderRulesContent()
				statusNode.textContent = 'Ziehe eine neue Karte.'
		} catch (error) {
			console.error(error)
			setLoadingState(false)
			statusNode.textContent = 'Die Karten konnten nicht geladen werden.'
			questionNode.textContent = 'Die Karten konnten nicht geladen werden.'
			categoryLabel.textContent = 'Fehler'
			updateMotionButton('3D Motion deaktiviert', 'is-disabled', false)
		}
	}

	initialize()
})
