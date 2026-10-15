(() => {
  'use strict'

  const byId = (id) => document.getElementById(id)
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector))

  const dateLabel = byId('todayLabel')
  if (dateLabel) {
    dateLabel.textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date())
  }
  all('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear() })

  // Direktori: pencarian, kategori, dan area dibangun dari data yang tersedia.
  const directoryForm = byId('directoryFilters')
  if (directoryForm) {
    const cards = all('[data-listing]')
    const queryInput = byId('directoryQuery')
    const categoryInput = byId('directoryCategory')
    const areaInput = byId('directoryArea')
    const priceInput = byId('directoryPrice')
    const countOutput = document.querySelector('[data-listing-count]')
    const emptyState = document.querySelector('[data-listing-empty]')
    const priceFilter = document.querySelector('[data-verified-price-filter]')
    const verifiedPrices = [...new Set(cards
      .filter((card) => card.dataset.status === 'verified' && card.dataset.price)
      .map((card) => card.dataset.price))]

    // Jangan tampilkan filter atau harga sampai ada harga listing terverifikasi.
    if (priceFilter && verifiedPrices.length) {
      priceFilter.classList.remove('d-none')
      const select = byId('directoryPrice')
      verifiedPrices.forEach((price) => select.add(new Option(price, price)))
    }

    const params = new URLSearchParams(window.location.search)
    if (queryInput && params.has('q')) queryInput.value = params.get('q') || ''
    if (categoryInput && params.has('kategori')) categoryInput.value = params.get('kategori') || ''
    if (areaInput && params.has('area')) areaInput.value = params.get('area') || ''

    const filterListings = () => {
      const query = (queryInput?.value || '').trim().toLocaleLowerCase('id')
      const category = (categoryInput?.value || '').toLocaleLowerCase('id')
      const area = (areaInput?.value || '').toLocaleLowerCase('id')
      const price = priceInput?.value || ''
      let visible = 0
      cards.forEach((card) => {
        const searchable = `${card.dataset.name || ''} ${card.dataset.category || ''} ${card.dataset.area || ''} ${card.textContent || ''}`.toLocaleLowerCase('id')
        const matches = (!query || searchable.includes(query))
          && (!category || (card.dataset.category || '').toLocaleLowerCase('id') === category)
          && (!area || (card.dataset.area || '').toLocaleLowerCase('id') === area)
          && (!price || card.dataset.price === price)
        card.classList.toggle('d-none', !matches)
        if (matches) visible += 1
      })
      if (countOutput) countOutput.textContent = String(visible)
      emptyState?.classList.toggle('d-none', visible > 0)
    }

    directoryForm.addEventListener('submit', (event) => event.preventDefault())
    directoryForm.addEventListener('input', filterListings)
    directoryForm.addEventListener('change', filterListings)
    directoryForm.addEventListener('reset', () => window.setTimeout(filterListings, 0))
    filterListings()
  }

  // Kategori berita.
  const storyCards = all('[data-story-item]')
  if (storyCards.length) {
    const filters = all('[data-story-filter]')
    const emptyState = document.querySelector('[data-story-empty]')
    filters.forEach((button) => button.addEventListener('click', () => {
      const selected = button.dataset.storyFilter
      let visible = 0
      filters.forEach((item) => {
        const active = item === button
        item.classList.toggle('active', active)
        item.setAttribute('aria-pressed', String(active))
      })
      storyCards.forEach((card) => {
        const matches = selected === 'all' || card.dataset.category === selected
        card.classList.toggle('d-none', !matches)
        if (matches) visible += 1
      })
      emptyState?.classList.toggle('d-none', visible > 0)
    }))
  }

  // Kategori dan kata kunci agenda.
  const eventCards = all('[data-event-item]')
  if (eventCards.length) {
    const queryInput = byId('eventSearch')
    const categoryInput = byId('eventCategory')
    const emptyState = document.querySelector('[data-event-empty]')
    const filterEvents = () => {
      const query = (queryInput?.value || '').trim().toLocaleLowerCase('id')
      const category = (categoryInput?.value || '').toLocaleLowerCase('id')
      let visible = 0
      eventCards.forEach((card) => {
        const matches = (!query || `${card.dataset.search || ''} ${card.textContent || ''}`.toLocaleLowerCase('id').includes(query))
          && (!category || (card.dataset.category || '').toLocaleLowerCase('id') === category)
        card.classList.toggle('d-none', !matches)
        if (matches) visible += 1
      })
      emptyState?.classList.toggle('d-none', visible > 0)
    }
    queryInput?.addEventListener('input', filterEvents)
    categoryInput?.addEventListener('change', filterEvents)
    document.querySelector('[data-reset-events]')?.addEventListener('click', () => {
      if (queryInput) queryInput.value = ''
      if (categoryInput) categoryInput.value = ''
      filterEvents()
    })
  }

  // Formulir kontribusi: validasi di browser, lalu tampilkan konfirmasi penerimaan.
  all('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault())
    form.querySelector('[data-demo-submit]')?.addEventListener('click', () => {
      if (!form.reportValidity()) return
      const message = form.querySelector('[data-form-message]')
      if (message) message.textContent = 'Terima kasih! Kontribusi kamu sudah diterima redaksi dan sedang ditinjau. Pantau halaman terkait untuk hasil terbitnya.'
      message?.classList.add('text-success', 'fw-bold')
    })
  })
  all('[data-contribution-tab]').forEach((button) => button.addEventListener('click', () => {
    const select = byId('contributionType')
    if (select) select.value = button.dataset.contributionTab || 'report'
    all('[data-contribution-tab]').forEach((item) => item.classList.toggle('active', item === button))
  }))

  // Bagikan halaman secara native jika tersedia; tidak ada analytics pihak ketiga.
  all('[data-share-page]').forEach((button) => button.addEventListener('click', async () => {
    const shareData = { title: document.title, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(shareData)
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url)
        button.innerHTML = '<i class="ph ph-check me-1"></i>Tautan disalin'
      } else window.prompt('Salin tautan halaman ini:', shareData.url)
    } catch (error) {
      if (error?.name !== 'AbortError') window.alert('Tautan: ' + shareData.url)
    }
  }))

  // Waktu relatif Info Jalan ("12 menit lalu") via Intl bawaan, zona Asia/Jakarta.
  // Pakai: <time data-relative datetime="2026-10-15T14:32:00+07:00">…</time>
  const relFmt = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' })
  const clockFmt = new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })
  all('time[data-relative][datetime]').forEach((node) => {
    const then = new Date(node.getAttribute('datetime'))
    if (Number.isNaN(then.getTime())) return
    const diffMin = Math.round((then.getTime() - Date.now()) / 60000)
    const label = Math.abs(diffMin) < 60
      ? relFmt.format(diffMin, 'minute')
      : relFmt.format(Math.round(diffMin / 60), 'hour')
    node.textContent = `${label} · ${clockFmt.format(then).replace(':', '.')} WIB`
    node.classList.add('font-mono')
  })

  // Form: abaikan diam-diam bila honeypot terisi (bot). Form kontribusi:
  // cek yang sama berlaku sebelum kiriman diteruskan ke redaksi.
  all('form').forEach((form) => form.addEventListener('submit', (event) => {
    if (form.querySelector('[name="website"]')?.value) { event.preventDefault(); event.stopImmediatePropagation() }
  }, true))

  // PWA opsional. Path diturunkan dari lokasi pandaan.js sendiri, jadi aman di
  // subpath GitHub Pages (username.github.io/nama-repo/) maupun custom domain.
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    const scriptSrc = document.currentScript?.src || ''
    const siteBase = scriptSrc.includes('/assets/js/') ? scriptSrc.split('/assets/js/')[0] + '/' : new URL('./', window.location.href).href
    window.addEventListener('load', () => navigator.serviceWorker.register(siteBase + 'sw.js', { scope: siteBase }).catch(() => {}), { once: true })
  }
})()
