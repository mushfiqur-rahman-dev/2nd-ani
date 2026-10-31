import { useState } from 'react'
import { useStory } from '../context/StoryContext'

export function LoveTest() {
  const { storyData } = useStory()
  const questions = storyData.loveTest
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [complete, setComplete] = useState(false)

  const question = questions[questionIndex] || questions[0]
  const choose = (answerIndex: number) => {
    if (selected !== null) return
    setSelected(answerIndex)
    window.setTimeout(() => {
      const nextScore = score + (answerIndex === question.correct ? 1 : 0)
      if (questionIndex === questions.length - 1) {
        setScore(nextScore)
        setComplete(true)
      } else {
        setScore(nextScore)
        setQuestionIndex((index) => index + 1)
        setSelected(null)
      }
    }, 650)
  }

  const restart = () => {
    setQuestionIndex(0)
    setScore(0)
    setSelected(null)
    setComplete(false)
  }

  const quizInfo = storyData.quizSection

  return (
    <div className="love-test">
      <div className="test-heading">
        <span className="interactive-label">{quizInfo?.label || 'A heart-to-heart'}</span>
        <h2>
          {quizInfo?.title || 'How well do you know'}{' '}
          <em>{quizInfo?.titleItalic || 'our love?'}</em>
        </h2>
        <p>
          {quizInfo?.subtitle ||
            'There are no wrong answers here. Just the things I hope you feel when you think of us.'}
        </p>
      </div>
      <div className="test-card">
        {!complete ? (
          <>
            <div className="test-meta"><span>Question {questionIndex + 1} of {questions.length}</span><span>{'♡'.repeat(questionIndex + 1)}</span></div>
            <div className="test-progress"><span style={{ transform: `scaleX(${(questionIndex + 1) / questions.length})` }} /></div>
            <h3>{question.prompt}</h3>
            <div className="answer-list">
              {question.answers.map((answer, index) => (
                <button className={`answer ${selected === index ? (index === question.correct ? 'is-correct' : 'is-wrong') : ''}`} type="button" key={answer} onClick={() => choose(index)} disabled={selected !== null}>
                  <span>{String.fromCharCode(65 + index)}</span>{answer}<i>{selected === index ? (index === question.correct ? '♡' : '×') : '↗'}</i>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="test-result">
            <span className="result-heart">♡</span>
            <span className="interactive-label">Your love score</span>
            <strong>{score}/{questions.length}</strong>
            <h3>
              {score === questions.length
                ? (quizInfo?.resultPerfect || 'You know us by heart.')
                : (quizInfo?.resultGood || 'You know the sweetest parts.')}
            </h3>
            <p>
              {quizInfo?.resultFooter ||
                'And honestly, the best answer will always be choosing each other again.'}
            </p>
            <button className="button button-rose" type="button" onClick={restart}>Take it again <span className="button-icon">↻</span></button>
          </div>
        )}
      </div>
    </div>
  )
}
