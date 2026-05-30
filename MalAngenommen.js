document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('[data-app]')
	const activeCard = document.querySelector('[data-active-card]')
	const frontQuestionNode = activeCard ? activeCard.querySelector('[data-front-question]') : null
	const backQuestionNode = activeCard ? activeCard.querySelector('[data-back-question]') : null
	const cardBackLogoNode = activeCard ? activeCard.querySelector('.card-back-logo') : null
	const cardBackOrbitTextNodes = activeCard ? Array.from(activeCard.querySelectorAll('.card-back-orbit-text textPath')) : []
	const questionNode = frontQuestionNode || backQuestionNode || document.querySelector('[data-question]')
	const categoryLabel = activeCard ? activeCard.querySelector('[data-category-label]') : document.querySelector('[data-category-label]')
	
	const motionToggle = document.querySelector('[data-motion-toggle]')
	const languageToggle = document.querySelector('[data-language-toggle]')
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
			logoSrc: 'Media/Hypothetical_Logo.svg',
			accent: '#ff8a5b',
			accentSoft: 'rgba(255, 138, 91, 0.18)',
			top: 'rgba(38, 23, 31, 0.96)',
			bottom: 'rgba(14, 10, 18, 0.97)'
		},
		showstopper: {
			label: 'Showstopper',
			className: 'theme-showstopper',
			text: '#f4fbff',
			logoSrc: 'Media/Showstopper Logo.svg',
			accent: '#6fc4ff',
			accentSoft: 'rgba(111, 196, 255, 0.16)',
			top: 'rgba(17, 28, 44, 0.96)',
			bottom: 'rgba(10, 14, 26, 0.98)'
		},
		kombichaos: {
			label: 'Kombichaos',
			className: 'theme-kombichaos',
			text: '#f7fff1',
			logoSrc: 'Media/Kombichaos Logo.svg',
			accent: '#9eff7a',
			accentSoft: 'rgba(158, 255, 122, 0.16)',
			top: 'rgba(20, 30, 18, 0.96)',
			bottom: 'rgba(10, 16, 12, 0.98)'
		},
		monkeyspaw: {
			label: 'Monkey’s Paw',
			className: 'theme-monkeyspaw',
			text: '#fff7e9',
			logoSrc: 'Media/Monkeys Paw Logo.svg',
			accent: '#ffc45c',
			accentSoft: 'rgba(255, 196, 92, 0.16)',
			top: 'rgba(35, 27, 17, 0.96)',
			bottom: 'rgba(15, 11, 7, 0.98)'
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
		touchStartX: 0,
		touchStartY: 0,
		lastTouchY: 0,
		lastTouchX: 0,
		touchStartTime: 0,
		dragOffsetY: 0,
		motionX: 0,
		motionY: 0,
		tiltX: 0,
		tiltY: 0,
		tiltZ: 0,
		flipRotationDeg: 0,
		fitFrame: 0
		,enterAnimationActive: false
		,spawnAnimationTimer: null
	}

	const SWIPE_DISTANCE = 88
	const SWIPE_RATIO = 1.2
	const SWIPE_VELOCITY = 0.72
	const SPAWN_MOTION_STORAGE_KEY = 'malangenommen.spawnMotionMode'
	const MAX_DRAG_ROTATION = 6
	const MAX_TILT_X = 14
	const MAX_TILT_Y = 16
	const MAX_TILT_Z = 3.2
	const MAX_MOTION_X = 20
	const MAX_MOTION_Y = 22
	const TILT_DAMPING = 0.22
	const TILT_Z_DAMPING = 0.035
	const MOTION_DEADZONE = 0.55
	const TILT_DEADZONE = 0.45
	const MAX_MOTION_STEP = 0.9
	const MAX_TILT_STEP = 0.7
	const MOTION_SMOOTHING = 0.14

	const softClamp = (value, max) => {
		return max * Math.tanh(value / max)
	}

	const applyDeadzone = (value, threshold) => {
		return Math.abs(value) < threshold ? 0 : value
	}

	const stepToward = (current, target, maxStep) => {
		const delta = target - current
		const boundedDelta = Math.max(-maxStep, Math.min(maxStep, delta))
		return current + boundedDelta
	}

	const applySmoothedMotionTargets = (targets) => {
		const targetMotionX = applyDeadzone(targets.motionX, MOTION_DEADZONE)
		const targetMotionY = applyDeadzone(targets.motionY, MOTION_DEADZONE)
		const targetTiltX = applyDeadzone(targets.tiltX, TILT_DEADZONE)
		const targetTiltY = applyDeadzone(targets.tiltY, TILT_DEADZONE)
		const targetTiltZ = applyDeadzone(targets.tiltZ, TILT_DEADZONE)

		const easedMotionX = state.motionX + (targetMotionX - state.motionX) * MOTION_SMOOTHING
		const easedMotionY = state.motionY + (targetMotionY - state.motionY) * MOTION_SMOOTHING
		const easedTiltX = state.tiltX + (targetTiltX - state.tiltX) * MOTION_SMOOTHING
		const easedTiltY = state.tiltY + (targetTiltY - state.tiltY) * MOTION_SMOOTHING
		const easedTiltZ = state.tiltZ + (targetTiltZ - state.tiltZ) * MOTION_SMOOTHING

		state.motionX = stepToward(state.motionX, easedMotionX, MAX_MOTION_STEP)
		state.motionY = stepToward(state.motionY, easedMotionY, MAX_MOTION_STEP)
		state.tiltX = stepToward(state.tiltX, easedTiltX, MAX_TILT_STEP)
		state.tiltY = stepToward(state.tiltY, easedTiltY, MAX_TILT_STEP)
		state.tiltZ = stepToward(state.tiltZ, easedTiltZ, MAX_TILT_STEP)
		applyMotionTransform()
	}

	const normalizeSpawnMotionMode = (value) => {
		const normalized = String(value || '').toLowerCase()
		if (normalized === 'on' || normalized === 'off') {
			return normalized
		}

		return 'on'
	}

	const normalizeCategory = (value) => {
		const normalized = String(value || '')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-z]/g, '')

		if (normalized.includes('showstopper')) {
			return 'showstopper'
		}

		if (normalized.includes('kombichaos')) {
			return 'kombichaos'
		}

		if (normalized.includes('monkeyspaw') || normalized.includes('mokeyspaw') || normalized.includes('mokeystpaw')) {
			return 'monkeyspaw'
		}

		return 'hypothetical'
	}

	const shuffle = (items) => {
		const next = items.slice()

		for (let index = next.length - 1; index > 0; index -= 1) {
			const swapIndex = Math.floor(Math.random() * (index + 1))
			;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
		}

		return next
	}

	const toCards = (rawCards) => {
		return rawCards
			.map((card, index) => {
				const categoryKey = normalizeCategory(card?.category)
				const questionDe = String(card?.question || '').trim()
				const questionEn = String(card?.question_en || '').trim()

				if (!questionDe && !questionEn) {
					return null
				}

				return {
					id: `${categoryKey}-${index}`,
					categoryKey,
					categoryLabel: CATEGORY_STYLES[categoryKey].label,
					questionDe,
					questionEn,
					rawIndex: index
				}
			})
			.filter(Boolean)
	}

	const getCardQuestion = (card) => {
		if (!card) {
			return ''
		}

		if (state.language === 'en') {
			return card.questionEn || card.questionDe || ''
		}

		return card.questionDe || card.questionEn || ''
	}

	const getData = async () => {
		if (window.MAL_ANGENOMMEN_DATA?.cards) {
			return window.MAL_ANGENOMMEN_DATA
		}

		const response = await fetch('MalAngenommen_V2.json')
		if (!response.ok) {
			throw new Error('Konnte die Kartendaten nicht laden.')
		}

		return response.json()
	}

	const setTheme = (card) => {
		const theme = CATEGORY_STYLES[card.categoryKey] || CATEGORY_STYLES.hypothetical

		app.classList.remove(...Object.values(CATEGORY_STYLES).map((entry) => entry.className))
		app.classList.add(theme.className)
		app.style.setProperty('--accent', theme.accent)
		app.style.setProperty('--accent-soft', theme.accentSoft)
		app.style.setProperty('--card-top', theme.top)
		app.style.setProperty('--card-bottom', theme.bottom)

		activeCard.style.setProperty('--card-text', theme.text)
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
			return
		}

		state.motionBaselineBeta = beta
		state.motionBaselineGamma = gamma
		state.motionBaselinePending = false
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

	const applyMotionTransform = () => {
		const target = activeCard
		target.style.setProperty('--motion-x', `${state.motionX}px`)
		target.style.setProperty('--motion-y', `${state.motionY}px`)
		target.style.setProperty('--tilt-x', `${state.tiltX}deg`)
		target.style.setProperty('--tilt-y', `${state.tiltY}deg`)
		target.style.setProperty('--tilt-z', `${state.tiltZ}deg`)
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
		const targetTiltX = softClamp(normalizedX * MAX_TILT_X * 0.9, MAX_TILT_X)
		const targetTiltY = softClamp(normalizedY * MAX_TILT_Y * 0.9, MAX_TILT_Y)
		const targetTiltZ = softClamp(normalizedX * MAX_TILT_Z * 0.12, MAX_TILT_Z)

		applySmoothedMotionTargets({
			motionX: targetMotionX,
			motionY: targetMotionY,
			tiltX: targetTiltX,
			tiltY: targetTiltY,
			tiltZ: targetTiltZ
		})
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

		const baselineBeta = Number.isFinite(state.motionBaselineBeta) ? state.motionBaselineBeta : beta
		const baselineGamma = Number.isFinite(state.motionBaselineGamma) ? state.motionBaselineGamma : gamma
		const deltaBeta = beta - baselineBeta
		const deltaGamma = gamma - baselineGamma
		const activationAlpha = Math.min(1, Math.max(0, (performance.now() - state.motionActivatedAt) / 260))
		const targetMotionX = softClamp(deltaBeta * 0.24, MAX_MOTION_X) * activationAlpha
		const targetMotionY = softClamp(-deltaGamma * 0.28, MAX_MOTION_Y) * activationAlpha
		const targetTiltX = softClamp(deltaBeta * TILT_DAMPING, MAX_TILT_X) * activationAlpha
		const targetTiltY = softClamp(-deltaGamma * TILT_DAMPING, MAX_TILT_Y) * activationAlpha
		const targetTiltZ = softClamp(deltaGamma * TILT_Z_DAMPING, MAX_TILT_Z) * activationAlpha

		applySmoothedMotionTargets({
			motionX: targetMotionX,
			motionY: targetMotionY,
			tiltX: targetTiltX,
			tiltY: targetTiltY,
			tiltZ: targetTiltZ
		})
	}

	const disableMotion = () => {
		state.isMotionEnabled = false
		state.isMotionSuspended = false
		state.motionPermissionState = 'denied'
		state.motionBaselineBeta = null
		state.motionBaselineGamma = null
		state.motionBaselinePending = false
		state.motionActivatedAt = 0
		state.motionX = 0
		state.motionY = 0
		state.tiltX = 0
		state.tiltY = 0
		state.tiltZ = 0
		applyMotionTransform()
		updateMotionButton('3D Motion deaktiviert', 'is-disabled', false)
		statusNode.textContent = '3D Motion wurde deaktiviert.'
	}

	const enableMotion = () => {
		state.isMotionEnabled = true
		state.isMotionSuspended = false
		state.motionPermissionState = 'granted'
		state.motionActivatedAt = performance.now()
		setMotionBaseline(state.lastOrientationBeta, state.lastOrientationGamma)
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
		applyMotionTransform()
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
		const remaining = state.drawPile.length + 1
		statusNode.textContent = `${remaining} Karten im Stapel`
	}

	const buildDrawPile = (excludeId) => {
		state.drawPile = shuffle(state.cards.filter((card) => card.id !== excludeId))
	}

	const setPreviewCards = () => {
		const previewCards = state.drawPile.slice(0, stackCards.length)

		stackCards.forEach((stackCard, index) => {
			const preview = previewCards[index]
			const theme = preview ? CATEGORY_STYLES[preview.categoryKey] : CATEGORY_STYLES.hypothetical

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
		const { resetFlip = true } = options
		const theme = CATEGORY_STYLES[card.categoryKey] || CATEGORY_STYLES.hypothetical
			categoryLabel.textContent = theme.label
			if (frontQuestionNode) {
				frontQuestionNode.textContent = getCardQuestion(card)
				frontQuestionNode.style.color = theme.text
			}
			if (cardBackLogoNode) {
				cardBackLogoNode.src = theme.logoSrc
				cardBackLogoNode.alt = `${theme.label} logo`
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

			setTheme(card)
			updateLanguageButton()
			updateDeckLabels()
			setPreviewCards()
			fitQuestionText()
			if (resetFlip) {
				// New cards start on the logo side ("back side"), then flip to reveal the question side.
				setFlipClass(true)
				setFlipRotation(180)
			}
	}

	const toggleLanguage = () => {
		state.language = state.language === 'en' ? 'de' : 'en'
		updateLanguageButton()

		if (state.currentCard) {
			renderCard(state.currentCard, { resetFlip: false })
		}
	}

	const startFromRandomCard = () => {
		const randomIndex = Math.floor(Math.random() * state.cards.length)
		state.currentCard = state.cards[randomIndex]
		buildDrawPile(state.currentCard.id)
		renderCard(state.currentCard)
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
		state.dragOffsetY = 0
		state.isDragging = false
		applyMotionTransform()
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
		if (state.isAnimating || state.enterAnimationActive) {
			return
		}

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
			state.isAnimating = false
			state.enterAnimationActive = false
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

		const touch = event.touches[0]
		state.isDragging = true
		state.touchStartX = touch.clientX
		state.touchStartY = touch.clientY
		state.lastTouchX = touch.clientX
		state.lastTouchY = touch.clientY
		state.touchStartTime = performance.now()
		clearSpawnAnimation()
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
			resetCardPosition()
			window.requestAnimationFrame(() => flipCard(direction))
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

		// toggle flipped state
		setFlipClass(!state.isFlipped)

		if (motionWasActive) {
			window.setTimeout(() => resumeMotionAfterTransition(), 420)
		}
	}

	const onKeyDown = (event) => {
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
		motionToggle?.addEventListener('click', toggleMotion)
		languageToggle?.addEventListener('click', toggleLanguage)
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('resize', fitQuestionText)
		window.addEventListener('deviceorientation', updateTiltFromOrientation)
		window.addEventListener('pointermove', updateTiltFromPointer)
	}

	const initialize = async () => {
		try {
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

			if (state.cards.length === 0) {
				throw new Error('Keine Karten gefunden.')
			}

			startFromRandomCard()
			bindEvents()
			updateMotionButton('3D Motion', '', false)
			updateLanguageButton()
			statusNode.textContent = 'Ziehe eine neue Karte.'
		} catch (error) {
			console.error(error)
			statusNode.textContent = 'Die Karten konnten nicht geladen werden.'
			questionNode.textContent = 'Die Karten konnten nicht geladen werden.'
			categoryLabel.textContent = 'Fehler'
			updateMotionButton('3D Motion deaktiviert', 'is-disabled', false)
		}
	}

	initialize()
})
