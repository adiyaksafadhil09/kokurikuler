/* script.js - VERSI TERBARU DENGAN PEMESANAN DINAMIS */

/* script.js - Tambahkan Logika Dropdown Bantuan */

document.addEventListener('DOMContentLoaded', () => {
    // ... (Semua kode yang sudah ada) ...

    // === LOGIKA DROP DOWN BANTUAN BARU ===
    const helpBtn = document.getElementById('helpBtn');
    const helpDropdown = document.getElementById('helpDropdown');

    // Fungsi untuk menampilkan/menyembunyikan dropdown
    helpBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event klik menyebar ke window
        helpDropdown.classList.toggle('show');
    });

    // Menutup dropdown saat mengklik di luar area
    window.addEventListener('click', (e) => {
        if (!helpBtn.contains(e.target) && helpDropdown.classList.contains('show')) {
            helpDropdown.classList.remove('show');
        }
    });

    // ... (Lanjutkan dengan semua kode lainnya: runSearch, Modal, dll.)
});document.addEventListener('DOMContentLoaded', () => {
    // ... (Kode Pencarian dan Query Selector lama tetap di sini) ...
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const cards = document.querySelectorAll('.card');
    const noResults = document.getElementById('noResults');

    const modal = document.getElementById('experienceModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalBody = document.getElementById('modalBody');

    // =========================================================
    // FUNGSI PENCARIAN (TIDAK BERUBAH)
    // =========================================================
    function runSearch() {
        const query = searchInput.value.toLowerCase().trim();
        let anyMatch = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const tag = card.querySelector('.card-tag').innerText.toLowerCase();

            if (title.includes(query) || tag.includes(query)) {
                card.style.display = 'block';
                anyMatch = true;
            } else {
                card.style.display = 'none';
            }
        });
        noResults.style.display = anyMatch ? 'none' : 'block';
    }

    searchInput.addEventListener('input', runSearch);
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        runSearch();
        document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
    });
    // ... (Kode untuk Sticky Header juga tetap di sini) ...
    
    // =========================================================
    // FUNGSI MODAL & PEMESANAN DINAMIS
    // =========================================================
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. Ambil Data dari Kartu
            const title = card.querySelector('h3').innerText;
            const tag = card.querySelector('.card-tag').innerText;
            const desc = card.querySelector('p').innerText;
            const priceText = card.querySelector('.price').innerText;
            const imgSrc = card.querySelector('img').src;
            
            // Ekstrak harga dasar (contoh: "Rp 150.000 / Sesi" -> 150000)
            const basePrice = parseInt(priceText.replace(/[^\d]/g, ''));

            // 2. Isi Modal dengan Konten Detail & Form
            modalBody.innerHTML = `
                <img src="${imgSrc}" class="modal-detail-img">
                <span class="card-tag">${tag}</span>
                <h2>${title}</h2>
                <p style="color: #666; margin-top: 10px;">${desc}. Durasi 3 jam. Termasuk alat, bahan, dan minuman selamat datang.</p>
                <h3 style="color: var(--primary); margin: 15px 0;">Harga Per Orang: ${priceText}</h3>
                
                <div class="order-form">
                    <h4>Detail Pemesanan & Pembayaran</h4>
                    
                    <div class="input-group-order">
                        <label for="orderDate">Tanggal:</label>
                        <input type="date" id="orderDate" value="${new Date().toISOString().substring(0, 10)}" required>
                    </div>

                    <div class="input-group-order">
                        <label for="numPeople">Jumlah Orang:</label>
                        <input type="number" id="numPeople" value="1" min="1" required>
                    </div>

                    <p class="total-price-display">
                        Total Biaya: <span id="totalPrice" style="font-weight: bold; color: var(--accent);">Rp ${basePrice.toLocaleString('id-ID')}</span>
                    </p>

                    <h4 style="margin-top: 25px;">Pilih Metode Pembayaran:</h4>
                    <div class="payment-options">
                        <label><input type="radio" name="paymentMethod" value="Transfer" checked> Transfer Bank</label>
                        <label><input type="radio" name="paymentMethod" value="E-Wallet"> E-Wallet (GoPay/Dana)</label>
                        <label><input type="radio" name="paymentMethod" value="Card"> Kartu Kredit/Debit</label>
                    </div>

                    <button class="btn-order" id="confirmOrderBtn">Konfirmasi & Bayar</button>
                </div>
            `;
            
            modal.style.display = "block";
            
            // 3. Tambahkan Logika Perhitungan Harga Dinamis
            const numPeopleInput = document.getElementById('numPeople');
            const totalPriceDisplay = document.getElementById('totalPrice');
            const confirmOrderBtn = document.getElementById('confirmOrderBtn');

            const calculateTotal = () => {
                const people = parseInt(numPeopleInput.value) || 1;
                const total = basePrice * people;
                totalPriceDisplay.innerText = `Rp ${total.toLocaleString('id-ID')}`;
            };
            
            numPeopleInput.addEventListener('input', calculateTotal);

            // 4. Logika Konfirmasi Pemesanan (Simulasi)
            confirmOrderBtn.addEventListener('click', () => {
                const date = document.getElementById('orderDate').value;
                const people = numPeopleInput.value;
                const total = totalPriceDisplay.innerText;
                const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

                if (!date || people < 1) {
                    alert("Mohon lengkapi Tanggal dan Jumlah Orang.");
                    return;
                }

                alert(`🎉 Pesanan Berhasil Dibuat!
- Pengalaman: ${title}
- Tanggal: ${date}
- Peserta: ${people} Orang
- Total: ${total}
- Metode Pembayaran: ${paymentMethod}

Anda akan diarahkan ke halaman pembayaran!`);
                
                modal.style.display = "none";
            });
        });
    });

    // Tutup Modal
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    }
    
    // (Tambahkan Logika untuk Sticky Header di sini jika belum ada)
});
/* script.js - Tambahkan Logika Fungsi Tautan Bantuan */

document.addEventListener('DOMContentLoaded', () => {
    // ... (Semua kode yang sudah ada, termasuk Logika Drop Down Bantuan) ...
    
    // === LOGIKA FUNGSI MENU BANTUAN ===
    const helpLinks = document.querySelectorAll('#helpDropdown a');
    const helpDropdown = document.getElementById('helpDropdown');

    helpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah pindah halaman

            const linkText = link.innerText.trim();
            let message = '';

            switch(linkText) {
                case 'Pusat Bantuan':
                    message = "Selamat datang di Pusat Bantuan! Di sini Anda bisa menemukan FAQ, panduan pemesanan, dan informasi akun.";
                    break;
                case 'Hubungi Kami':
                    message = "Silakan hubungi kami melalui email: support@Griyasinau.com atau telepon: (021) 123-4567. Kami siap membantu Anda!";
                    break;
                case 'Tentang Kami':
                    message = "Griya Sinau adalah platform yang menghubungkan Anda dengan pengalaman budaya otentik dari seluruh Indonesia. Misi kami adalah melestarikan warisan dan memberdayakan komunitas lokal.";
            }

            // Menampilkan pesan simulasi
            alert(message);
            
            // Menutup dropdown setelah pesan ditampilkan
            helpDropdown.classList.remove('show');
        });
    });

    // ... (Lanjutkan dengan semua kode lainnya: runSearch, Modal, dll.)
});
/* script.js - Logika Fungsi Tautan Bantuan (Termasuk Panduan) */

document.addEventListener('DOMContentLoaded', () => {
    // ... (Semua kode yang sudah ada) ...
    
    // === LOGIKA FUNGSI MENU BANTUAN ===
    const helpLinks = document.querySelectorAll('#helpDropdown a');
    const helpDropdown = document.getElementById('helpDropdown');

    helpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah pindah halaman

            const linkText = link.innerText.trim();
            let message = '';

            switch(linkText) {
                // KASUS BARU UNTUK PANDUAN
                case 'Panduan':
                    message = "📚 Panduan Penggunaan Griya Sinau:\n\n1. Jelajahi: Gunakan kolom 'Cari' atau scroll ke bawah untuk menemukan pengalaman budaya berdasarkan kategori atau lokasi.\n2. Pesan: Klik kartu, isi jumlah peserta & tanggal, lalu pilih metode pembayaran.\n3. Host: Klik 'Menjadi Host' untuk mendaftarkan layanan pengalaman budaya Anda.";
                    break;
                // KASUS YANG SUDAH ADA
                case 'Pusat Bantuan':
                    message = "Selamat datang di Pusat Bantuan! Di sini Anda bisa menemukan FAQ, panduan pemesanan, dan informasi akun.";
                    break;
                case 'Hubungi Kami':
                    message = "Silakan hubungi kami melalui email: support@griyasinau.com atau telepon: (021) 123-4567. Kami siap membantu Anda!";
                    break;
                case 'Tentang Kami':
                    message = "Griya Sinau adalah platform yang menghubungkan Anda dengan pengalaman budaya otentik dari seluruh Indonesia. Misi kami adalah melestarikan warisan dan memberdayakan komunitas lokal.";
            }

            // Menampilkan pesan simulasi
            alert(message);
            
            // Menutup dropdown setelah pesan ditampilkan
            helpDropdown.classList.remove('show');
        });
    });

    // ... (Lanjutkan dengan semua kode Modal, Pencarian, dll.)
});