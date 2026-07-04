# GameNest World — Arama Motorlarında Üst Sıralara Çıkma Aksiyon Planı

## ⚠️ Önce dürüst bir gerçeklik payı

Hiçbir kişi, ajans ya da araç Google'da (veya herhangi bir arama motorunda) **"garantili 1. sıra"** veremez — bu Google'ın algoritmasına, rakiplerin gücüne, sitenin yaşına ve topladığı güvene (backlink, kullanıcı sinyalleri) bağlıdır. Yeni bir domain için gerçekçi zaman çizelgesi:

- **0–4 hafta:** Google sitenizi keşfeder ve indeksler (şu an bu aşamadasınız)
- **1–3 ay:** Düşük rekabetli, spesifik aramalarda ("free online chess puzzles" gibi) görünmeye başlarsınız
- **3–6 ay:** Düzenli içerik + backlink ile orta rekabetli terimlerde sıralama
- **6–12+ ay:** "free online games" gibi çok rekabetçi genel terimlerde anlamlı sıralama (bu terimde CrazyGames, Poki, Y8 gibi devasa, yıllardır var olan siteler var — onları geçmek uzun vadeli bir iştir)

Aşağıdaki plan, bu süreci **mümkün olan en hızlı ve sağlam** şekilde ilerletmek için yapman gerekenleri sırayla anlatıyor.

---

## ✅ Bu pakette az önce tamamladıklarım (teknik SEO)

1. **Open Graph görseli** (`og-image.png`) oluşturuldu ve tüm sayfalara eklendi — artık link paylaşıldığında (WhatsApp, Twitter/X, Facebook) düzgün bir önizleme kartı çıkar.
2. **robots meta etiketi** (`index, follow, max-image-preview:large`) eklendi — Google'a "beni indeksle, resimlerimi büyük göster" sinyali.
3. **theme-color** eklendi — mobilde tarayıcı üst çubuğu marka rengiyle uyumlu olur.
4. **Organization schema** eklendi — Google'ın markanızı bir "kuruluş" olarak tanımasına yardımcı olur (uzun vadede knowledge panel için temel).
5. Tüm blog makaleleri ve statik sayfalara da OG görseli/Twitter kartı eklendi.

---

## 1️⃣ İlk hafta yapman gerekenler (kritik, ücretsiz)

### Google Search Console
- [x] Zaten kurulu (konuşmamızda gördük) ✅
- [ ] **Sitemap'i tekrar gönder**: Search Console → Sitemaps → `sitemap.xml` gir → Submit (yeni sayfalar eklediysen)
- [ ] **URL Inspection** ile ana sayfayı ve en önemli 5 makaleyi tek tek "Request Indexing" yap

### Bing Webmaster Tools (unutulan ama önemli!)
Google dışında **Bing, Yahoo, DuckDuckGo'nun** hepsi Bing'in index'ini kullanır. Tek bir kurulumla 3 arama motorunda birden yer alırsın:
1. https://www.bing.com/webmasters adresine git
2. Google Search Console hesabını bağlayarak **otomatik import** yapabilirsin (en hızlı yol)
3. Sitemap'i orada da gönder: `https://gamenestworld.com/sitemap.xml`

### Google Analytics
- [x] Zaten kurulu (GA4 kodu sitede mevcut) ✅
- [ ] Search Console'u Analytics'e bağla (Analytics → Admin → Product Links → Search Console)

---

## 2️⃣ İçerik ve anahtar kelime stratejisi

### Şu an neyin var
- 24 blog makalesi (oyun stratejileri, ipuçları) ✅ — bu çok iyi bir başlangıç, çoğu yeni site rakiplerinin bunu bile yapmıyor.

### Sonraki adım: Uzun kuyruk (long-tail) anahtar kelimelere odaklan
"free online games" gibi genel terimlerde milyonlarca site yarışıyor. Bunun yerine **daha spesifik, rekabeti düşük** aramaları hedef al:

| Genel (çok zor) | Uzun kuyruk (daha kolay, hedeflenebilir) |
|---|---|
| free online games | free online chess puzzles no download |
| word games | 5 letter word guessing game free |
| math games | multiplication practice game for kids free |
| quiz games | free trivia quiz no sign up |

Her yeni blog yazısı ya da oyun sayfası başlığında bu tarz spesifik ifadeleri kullan.

### İçerik takvimi önerisi
Haftada 1 yeni makale/oyun duyurusu = Google'a "bu site aktif, güncel" sinyali. 24 makale zaten var; 3 ayda +12 makale daha eklemek ciddi bir fark yaratır.

---

## 3️⃣ Backlink (dış bağlantı) stratejisi — en önemli eksik parça

Google sıralamasının en büyük belirleyicisi **kaç kaliteli sitenin size link verdiği**. Şu an muhtemelen sıfır backlink var. Ücretsiz/düşük maliyetli başlangıç noktaları:

1. **Oyun dizin siteleri**: itch.io, IndieDB, AlternativeTo gibi sitelere "GameNest World" u bir proje/araç olarak ekle.
2. **Reddit**: r/WebGames, r/incremental_games gibi subredditlerde (spam gibi görünmeden, gerçek değer katarak) paylaş.
3. **Product Hunt**: Yeni bir web ürünü olarak lansman yap — anlık trafik + kaliteli backlink.
4. **Sosyal medya profilleri**: Twitter/X, Instagram, Facebook sayfası aç, bio'ya site linkini koy (düşük değerli ama ücretsiz backlink + marka sinyali).
5. **Yerel/niş forumlar ve Discord sunucuları**: Oyun/kod toplulukları, tasarım toplulukları.
6. **Guest post**: Küçük oyun/teknoloji bloglarına "misafir yazar" olarak katkıda bulunup bio'da link almak.

---

## 4️⃣ Teknik performans kontrolü (yapman gerekenler)

1. **PageSpeed Insights** ile siteni test et: https://pagespeed.web.dev → `gamenestworld.com` yaz
   - Skorun düşükse (özellikle mobilde), bana ekran görüntüsünü at, birlikte optimize ederiz.
2. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
3. **Core Web Vitals**: Search Console'da soldaki menüde "Core Web Vitals" sekmesine bak, kırmızı/sarı uyarı varsa paylaş.

---

## 5️⃣ "Tüm ülkelerde çıksın" için özel notlar

- **hreflang etiketleri zaten kurulu** (10 dil için) ✅ — bu, Google'a "bu sayfa şu dildeki kullanıcılar için" sinyali verir. Ama **gerçek çeviri içerik olmadan** bu etiketlerin faydası sınırlı (önceki konuşmamızda bahsettiğim gibi, şu an sadece dil seçici arayüz var, sayfa içeriği hâlâ İngilizce).
- Gerçekten çok ülkeli sıralama istiyorsan, öncelik sırası: **İngilizce içerik önce sağlam otorite kazansın**, sonra 2-3 büyük dile (İspanyolca, Portekizce, Fransızca — bunlar oyun/eğlence pazarında büyük) gerçek çeviri yatırımı yap. Bunu ayrı bir proje olarak planlayabiliriz, istersen başlayalım.
- Her ülke için ayrı domain/subdomain (`es.gamenestworld.com` gibi) büyük sitelerin yaptığı ama başlangıç için gereksiz karmaşıklık; şu anki tek-domain + hreflang yaklaşımı doğru.

---

## 📋 Öncelik sıralı yapılacaklar listesi (bu hafta)

1. [ ] Bu paketi (og-image + meta güncellemeleri) GitHub'a yükle
2. [ ] Search Console'da sitemap'i tekrar gönder + 5 sayfa için "Request Indexing"
3. [ ] Bing Webmaster Tools'a kaydol, Search Console'dan import et
4. [ ] PageSpeed Insights testi yap, sonucu paylaş
5. [ ] Bir sosyal medya hesabı aç (en azından Twitter/X), bio'ya link koy
6. [ ] Reddit'te ilgili bir subreddit'te siteyi paylaş

Bunları yaptıktan sonra 2-3 hafta bekle, Search Console'daki "Discovered/Indexed" sayılarını tekrar kontrol edip birlikte değerlendirelim.
