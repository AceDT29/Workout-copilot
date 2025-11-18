import { useMemo, useState } from 'react'
import { useExercises } from '../hooks/useExercises';

export function ExerciseGuide() {
  const { exercises, loading, error } = useExercises();
  const [typeFilter, setTypeFilter] = useState('all')
  const [bodyFilter, setBodyFilter] = useState('all')
  const [q, setQ] = useState('')

  const normalized = useMemo(() => {
    if (!exercises || exercises.length === 0) return [];
    return exercises.map(ex => ({
      ...ex,
      categoriesNorm: (ex.categories || []).map(c => String(c).toLowerCase())
    }))
  }, [exercises])

  const bodyOptions = useMemo(() => {
    const set = new Set()
    normalized.forEach(ex => {
      ex.categoriesNorm.forEach(c => {
        if (c !== 'fuerza' && c !== 'calistenico') set.add(c)
      })
    })
    return Array.from(set).sort()
  }, [normalized])

  function matchType(ex) {
    if (typeFilter === 'all') return true
    return ex.categoriesNorm.includes(typeFilter)
  }

  function matchBody(ex) {
    if (bodyFilter === 'all') return true
    return ex.categoriesNorm.includes(bodyFilter)
  }

  function matchQuery(ex) {
    if (!q) return true
    const needle = q.trim().toLowerCase()
    return ex.name.toLowerCase().includes(needle) || ex.description.toLowerCase().includes(needle)
  }

  const filtered = normalized.filter(ex => matchType(ex) && matchBody(ex) && matchQuery(ex))

  if (loading) {
    return (
      <section className='max-w-5xl mx-auto p-4'>
        <div className='text-center py-12'>
          <p className='text-slate-600'>Cargando ejercicios...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='max-w-5xl mx-auto p-4'>
        <div className='text-center py-12'>
          <p className='text-red-600'>Error: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className='max-w-5xl mx-auto p-4'>
      <header className='mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-2xl font-semibold'>Guía de ejercicios</h2>
        <div className='flex-col flex gap-2 items-center md:flex-row'>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder='Buscar nombre o descripción' className='border rounded p-2 w-64' />
          <div className='flex justify-center items-center gap-2'>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className='border rounded p-2 flex'>
                <option value='all'>Todos los tipos</option>
                <option value='fuerza'>Fuerza</option>
                <option value='calistenico'>Calisténico</option>
            </select>
            <select value={bodyFilter} onChange={e => setBodyFilter(e.target.value)} className='border rounded p-2'>
                <option value='all'>Todas las zonas</option>
                {bodyOptions.map(b => (
                <option key={b} value={b}>{b[0].toUpperCase() + b.slice(1)}</option>
                ))}
            </select>
          </div>
        </div>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filtered.map((ex, idx) => (
          <article key={ex.id} className='p-4 rounded-md border bg-white shadow-md flex flex-col md:flex-row gap-4 items-stretch'>
            <figure className='w-full md:w-28 h-28 flex-shrink-0 rounded-md overflow-hidden border flex items-center justify-center bg-white'>
              <img src={ex.iconPath} alt={ex.name} className='w-full h-full object-contain p-2' onError={(e) => e.target.src = '/images/placeholder-exercise.svg'} />
            </figure>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div className='min-w-0'>
                  <h3 className='text-lg font-semibold truncate'>{idx + 1}. {ex.name}</h3>
                  <p className='text-xs text-slate-500 mb-2'>{ex.duration}s · {ex.series} series</p>
                </div>
                <div className='flex flex-col items-start md:items-end gap-2'>
                  <div className='text-xs text-slate-400'>Categorías</div>
                  <div className='flex gap-1 flex-wrap justify-start md:justify-end'>
                    {ex.categoriesNorm.map((c, i) => (
                      <span key={i} className='text-xs px-2 py-1 rounded bg-slate-100 border'>{c[0].toUpperCase() + c.slice(1)}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-3 text-sm text-slate-700 break-words whitespace-normal'>{ex.description}</p>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className='col-span-full text-center text-slate-600 p-6 border rounded'>No se encontraron ejercicios con esos filtros.</div>
        )}
      </div>
    </section>
  )
}


