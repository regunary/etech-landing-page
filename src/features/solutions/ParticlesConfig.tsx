import { useEffect, useState, useMemo } from 'react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

export const useParticles = () => {
  const [particlesInit, setParticlesInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setParticlesInit(true)
    })
  }, [])

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 0
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: ['#00ff88', '#00cc6a', '#00ff9f', '#00e676', '#4caf50']
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: { min: 0.2, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false
          }
        },
        links: {
          enable: true,
          distance: 150,
          color: '#00ff88',
          opacity: 0.3,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce'
          }
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'grab'
          },
          resize: {
            enable: true
          }
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.6
            }
          }
        }
      },
      detectRetina: true
    }),
    []
  )

  return { particlesInit, particlesOptions }
}
