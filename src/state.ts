import { getAnswerOfDay, getHint } from './lang'
import { meta, tries } from './storage'
import { checkPass, parseWord, testAnswer } from './utils'
import { START_DATE, TRIES_LIMIT } from './constants'

export const now = useNow({ interval: 1000 })
export const isDark = useDark()
export const showHint = ref(false)
export const showSettings = ref(false)
export const showHelp = ref(false)
export const showShare = ref(false)
export const showFailed = ref(false)

const params = new URLSearchParams(window.location.search)
export const isDev = params.get('dev') === 'hey'
export const daySince = useDebounce(computed(() => Math.floor((+now.value - +START_DATE) / 86400000)))
export const dayNo = computed(() => +(params.get('d') || daySince.value))
export const answer = computed(() =>
  params.get('word')
    ? {
      word: params.get('word')!,
      hint: getHint(params.get('word')!),
    }
    : getAnswerOfDay(dayNo.value),
)
export const isPassed = computed(() => tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1], answer.value.word))))
export const isFailed = computed(() => !isPassed.value && tries.value.length >= TRIES_LIMIT)
export const isFinished = computed(() => isPassed.value || meta.value.answer)

export const hint = computed(() => answer.value.hint)
export const parsedAnswer = computed(() => parseWord(answer.value.word))
