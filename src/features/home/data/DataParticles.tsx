import { useEffect, useRef } from 'react'

const DataParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = 0,
      h = 0,
      dpr = Math.max(1, window.devicePixelRatio || 1)
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string }
    let ps: P[] = []
    const colors = ['#1d4ed8', '#3b82f6', '#38bdf8', '#10b981', '#22c55e']

    const resize = () => {
      const parent = canvas.parentElement as HTMLElement
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(170, Math.floor((w * h) / 9000))
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.6,
        c: colors[(Math.random() * colors.length) | 0]
      }))
    }

    const prevComposite = ctx.globalCompositeOperation
    ctx.globalCompositeOperation = 'screen'

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.fillStyle = p.c + 'AA'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const dx = p.x - q.x,
            dy = p.y - q.y,
            dist = Math.hypot(dx, dy)
          if (dist < 90) {
            const g = ctx.createLinearGradient(p.x, p.y, q.x, q.y)
            g.addColorStop(0, p.c + '66')
            g.addColorStop(1, q.c + '33')
            ctx.strokeStyle = g
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    resize()
    step()
    const onR = () => resize()
    window.addEventListener('resize', onR)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onR)
      ctx.globalCompositeOperation = prevComposite
    }
  }, [])

  return (
    <canvas ref={canvasRef} className='absolute inset-0 -z-10 pointer-events-none select-none' aria-hidden='true' />
  )
}

export default DataParticles
