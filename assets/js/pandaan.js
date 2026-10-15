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

  // Formulir kontribusi: kolom mengikuti jenis kiriman. Situs statis ini TIDAK
  // mengirim apa pun — tombol hanya menyusun ringkasan agar pelapor bisa
  // meneruskannya sendiri. Pesan sukses "sudah diterima" sengaja tidak dipakai.
  const contribForm = document.querySelector('[data-contribution-form]')
  if (contribForm) {
    const typeSelect = byId('contributionType')
    const sections = all('[data-fields-for]', contribForm)
    const message = contribForm.querySelector('[data-form-message]')
    const output = contribForm.querySelector('[data-form-output]')
    const summaryBox = contribForm.querySelector('[data-summary]')

    const syncSections = () => {
      const type = typeSelect?.value || 'report'
      sections.forEach((section) => {
        const visible = section.dataset.fieldsFor === type
        section.classList.toggle('d-none', !visible)
        section.querySelectorAll('input, select, textarea').forEach((field) => {
          if (visible) { if (field.dataset.requiredWas === '1') field.required = true }
          else { if (field.required) field.dataset.requiredWas = '1'; field.required = false }
        })
      })
      all('[data-contribution-tab]').forEach((item) => {
        const selected = item.dataset.contributionTab === type
        item.classList.toggle('active', selected)
        item.setAttribute('aria-pressed', String(selected))
      })
    }
    // tandai kolom wajib bawaan tiap seksi sebelum disembunyikan
    sections.forEach((section) => section.querySelectorAll('[required]').forEach((f) => { f.dataset.requiredWas = '1' }))
    document.getElementById('reportTime')?.removeAttribute('required')
    document.getElementById('reportLocation')?.removeAttribute('required')
    document.getElementById('businessAddress')?.removeAttribute('required')
    document.getElementById('eventTime')?.removeAttribute('required')
    document.getElementById('eventVenue')?.removeAttribute('required')
    const markRequired = (id) => { const f = byId(id); if (f) { f.required = true; f.dataset.requiredWas = '1' } }
    ;['reportTime', 'reportLocation', 'businessAddress', 'eventTime', 'eventVenue'].forEach(markRequired)
    typeSelect?.addEventListener('change', syncSections)
    all('[data-contribution-tab]').forEach((button) => button.addEventListener('click', () => {
      if (typeSelect) typeSelect.value = button.dataset.contributionTab || 'report'
      syncSections()
    }))
    syncSections()

    contribForm.addEventListener('submit', (event) => {
      event.preventDefault()
      if (contribForm.querySelector('[name="website"]')?.value) return
      if (!contribForm.reportValidity()) return
      const labels = {
        type: 'Jenis', title: 'Judul/nama', whatsapp: 'WhatsApp pelapor',
        report_time: 'Waktu kejadian', report_location: 'Titik lokasi', report_photo: 'Tautan foto',
        business_address: 'Alamat usaha', business_hours: 'Jam buka', business_price: 'Kisaran harga',
        event_time: 'Tanggal & jam acara', event_venue: 'Lokasi acara', event_organizer: 'Penyelenggara',
        details: 'Keterangan',
      }
      const typeLabel = ({ report: 'Lapor kondisi jalan', business: 'Usulkan usaha lokal', event: 'Kirim info event' })[typeSelect?.value || 'report'] || ''
      const lines = [`Kontribusi pandaan.id — ${typeLabel}`]
      new FormData(contribForm).forEach((value, key) => {
        const text = String(value).trim()
        if (!text || key === 'website' || key === 'type') return
        lines.push(`${labels[key] || key}: ${text}`)
      })
      if (summaryBox) summaryBox.value = lines.join('\n')
      output?.classList.remove('d-none')
      if (message) {
        message.textContent = 'Ringkasan siap disalin di bawah. Laporan ini BELUM terkirim ke redaksi — situs pratinjau ini belum terhubung ke sistem pengiriman. Salin ringkasannya dan kirimkan lewat kanal redaksi agar benar-benar diterima.'
        message.classList.remove('text-success')
        message.classList.add('fw-bold')
      }
      output?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
    contribForm.querySelector('[data-copy-summary]')?.addEventListener('click', async (event) => {
      if (!summaryBox?.value) return
      try { await navigator.clipboard.writeText(summaryBox.value); event.currentTarget.innerHTML = '<i class="ph ph-check me-1"></i>Ringkasan disalin' }
      catch { summaryBox.select(); document.execCommand?.('copy') }
    })
  }

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

  // Info Jalan data-driven: laporan dibaca dari assets/data/road-reports.json.
  // Status "Aktif" tidak di-hardcode: laporan yang validUntil-nya terlewat
  // otomatis pindah ke Riwayat, dan angka tab dihitung dari data. Dievaluasi
  // ulang tiap menit selama halaman terbuka.
  const roadLists = all('[data-road-list]')
  if (roadLists.length) {
    const scriptSrc = document.querySelector('script[src*="pandaan.js"]')?.src || ''
    const siteBase = scriptSrc.includes('/assets/js/') ? scriptSrc.split('/assets/js/')[0] + '/' : new URL('./', window.location.href).href
    const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
    const fmtWhen = (iso) => {
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return ''
      const diffMin = Math.round((d.getTime() - Date.now()) / 60000)
      const rel = Math.abs(diffMin) < 60 ? relFmt.format(diffMin, 'minute') : relFmt.format(Math.round(diffMin / 60), 'hour')
      return `${rel} · ${clockFmt.format(d).replace(':', '.')} WIB`
    }
    const fmtFull = (iso) => new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso)).replace(' pukul ', ' · ').replace(':', '.') + ' WIB'
    const bucketOf = (r, now) => {
      if (r.state === 'perlu-dilengkapi') return 'incomplete'
      const expired = r.validUntil && now > new Date(r.validUntil)
      if (r.state === 'selesai' || expired) {
        return now - new Date(r.observedAt) <= 7 * 24 * 3600 * 1000 ? 'history' : 'archived'
      }
      return 'active'
    }
    const badgeFor = { active: ['text-bg-success', 'Aktif'], incomplete: ['text-bg-warning', 'Perlu dilengkapi'], history: ['text-bg-secondary', 'Selesai'] }
    const cardHtml = (r, bucket) => {
      const [cls, label] = badgeFor[bucket] || badgeFor.history
      const valid = r.validUntil ? `<span><i class="ph ph-hourglass me-1"></i>Berlaku s.d. <time datetime="${esc(r.validUntil)}">${esc(fmtWhen(r.validUntil))}</time></span>` : ''
      const link = bucket === 'incomplete'
        ? '<a class="text-link mt-3" href="../kontribusi">Bantu lengkapi laporan <i class="ph ph-arrow-right"></i></a>'
        : (r.detailUrl ? `<a class="text-link mt-3" href="../info-jalan/${esc(r.detailUrl)}">Lihat detail laporan <i class="ph ph-arrow-right"></i></a>` : '')
      return `<div class="col-lg-4"><article class="road-report-card"><div class="d-flex justify-content-between gap-2"><span class="eyebrow">${esc(r.type)}</span><span class="badge ${cls}">${label}</span></div><h3>${esc(r.title)}</h3><div class="road-report-meta"><span><i class="ph ph-map-pin me-1"></i>${esc(r.location)}</span><span><i class="ph ph-clock me-1"></i><time datetime="${esc(r.observedAt)}">${esc(fmtWhen(r.observedAt))}</time></span>${valid}</div><div class="road-report-note">${esc(r.note)}</div>${link}</article></div>`
    }
    let roadData = []
    const renderRoad = () => {
      const now = new Date()
      const buckets = { active: [], incomplete: [], history: [] }
      roadData.forEach((r) => { const b = bucketOf(r, now); if (buckets[b]) buckets[b].push(r) })
      const groups = { active: buckets.active, all: [...buckets.active, ...buckets.incomplete, ...buckets.history], incomplete: buckets.incomplete, history: buckets.history }
      Object.entries(groups).forEach(([key, items]) => {
        const list = document.querySelector(`[data-road-list="${key}"]`)
        const empty = document.querySelector(`[data-road-empty="${key}"]`)
        if (list) list.innerHTML = items.map((r) => cardHtml(r, key === 'all' ? bucketOf(r, now) : key)).join('')
        empty?.classList.toggle('d-none', items.length > 0)
        const badge = document.querySelector(`[data-road-count="${key}"]`)
        if (badge) badge.textContent = String(items.length)
      })
      const summary = document.querySelector('[data-road-summary]')
      if (summary) summary.textContent = `${buckets.active.length} laporan aktif ditampilkan dari data terstruktur; laporan kedaluwarsa otomatis pindah ke riwayat.`
      const updated = document.querySelector('[data-road-updated]')
      const latest = roadData.map((r) => r.observedAt).filter(Boolean).sort().pop()
      if (updated && latest) updated.textContent = `Diperbarui ${fmtFull(latest)}.`
    }
    fetch(siteBase + 'assets/data/road-reports.json', { cache: 'no-cache' })
      .then((res) => { if (!res.ok) throw new Error(res.status); return res.json() })
      .then((data) => { roadData = Array.isArray(data?.reports) ? data.reports : []; renderRoad(); window.setInterval(renderRoad, 60000) })
      .catch(() => {
        const summary = document.querySelector('[data-road-summary]')
        if (summary) summary.textContent = 'Data laporan gagal dimuat. Periksa koneksi lalu muat ulang halaman.'
      })
  }

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
