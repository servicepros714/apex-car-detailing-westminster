import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import './StepBar.css'

export default function StepBar({ onBack, onNext, backLabel = 'Back', nextLabel = 'Continue', nextDisabled, loading, hideBack }) {
  return (
    <div className="step-bar">
      <div className="step-bar-inner">
        {!hideBack ? (
          <button className="btn btn-outline step-bar-back" onClick={onBack}>
            <ChevronLeft size={18} /> {backLabel}
          </button>
        ) : <span />}
        <button className="btn btn-primary step-bar-next" onClick={onNext} disabled={nextDisabled || loading}>
          {loading ? <Loader2 size={18} className="spin" /> : <>{nextLabel} <ChevronRight size={18} /></>}
        </button>
      </div>
    </div>
  )
}
