# INPERBA PTTUN Makassar - Frontend

Frontend aplikasi **INPERBA PTTUN Makassar**: Monitoring Informasi Perkara Banding.

Dibangun dengan stack modern: **Bun**, **React**, **TypeScript**, **Vite**, **Hero UI**, **React Icons**, dan **Tailwind CSS**.

---

## 🚀 Teknologi yang Digunakan

- **[Bun](https://bun.sh/):** Runtime, package manager, dan bundler super cepat
- **[React](https://react.dev/):** Library UI modern
- **[TypeScript](https://www.typescriptlang.org/):** Superset JavaScript dengan static typing
- **[Vite](https://vitejs.dev/):** Alat pengembangan frontend generasi berikutnya
- **[Tailwind CSS](https://tailwindcss.com/):** Framework utility-first CSS
- **[Hero UI](https://www.heroui.com/):** Kumpulan komponen siap pakai untuk Tailwind CSS
- **[React Icons](https://react-icons.github.io/react-icons/):** Kumpulan ikon populer berbasis React

---

## 🏁 Cara Menjalankan

### 1. Persyaratan

- Sudah terinstal **Bun** (`curl -fsSL https://bun.sh/install | bash`)
- (Opsional) Node.js jika butuh API Node

### 2. Instalasi Dependensi

```sh
bun install
```

### 3. Menjalankan Development Server

```sh
bun run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

### 4. Build untuk Production

```sh
bun run build
```

### 5. Preview Hasil Build

```sh
bun run preview
```

---

## 📦 Struktur Modul Project

Struktur folder berdasarkan modularisasi fitur/layanan aplikasi (modular project structure):

```
src/
├── modules/
│   ├── auth/            # Modul autentikasi (login, register, otorisasi user)
│   ├── perkara/         # Modul perkara banding (entri, detail, monitoring, dsb)
│   ├── dashboard/       # Modul dashboard utama
│   ├── user/            # Modul manajemen user/pengguna
│   └── ...              # Modul-modul fitur lainnya
├── components/          # Komponen global & re-usable
├── layouts/             # Layout utama aplikasi
├── hooks/               # Custom hooks (jika ada)
├── utils/               # Utility/helper functions
├── routes/              # Deklarasi route aplikasi (opsional, jika tidak di dalam modules)
├── App.tsx              # Entry utama App
└── main.tsx             # Entry point Vite
```

Dengan struktur ini, setiap fitur utama memiliki folder sendiri di dalam `src/modules`, berisi logika, komponen, dan resource terkait modul tersebut.

---

## 🎨 Menggunakan Hero UI & React Icons

### Hero UI

Hero UI menyediakan komponen siap pakai berbasis Tailwind CSS.

Contoh penggunaan (lihat dokumentasi Hero UI untuk detail):

```tsx
import { Button } from '@heroui/react';

export function ExampleButton() {
  return (
    <Button>
      Simpan
    </Button>
  );
}
```

### React Icons

Install jika belum:

```sh
bun add react-icons
```

Contoh penggunaan di komponen:

```tsx
import { FaArrowRight } from 'react-icons/fa';

export function ExampleButton() {
  return (
    <button className="flex items-center">
      Next
      <FaArrowRight className="w-5 h-5 ml-2" />
    </button>
  );
}
```

---

## 🛠️ Menggunakan Tailwind CSS

Langsung tulis utility class di JSX:

```tsx
<div className="p-4 bg-blue-100 rounded-lg shadow">
  Contoh dengan Tailwind!
</div>
```

---

## 📝 Scripts

| Command           | Keterangan                              |
|-------------------|-----------------------------------------|
| `bun run dev`     | Menjalankan server development          |
| `bun run build`   | Build untuk produksi                    |
| `bun run preview` | Preview hasil build produksi            |

---

## 📚 Dokumentasi Referensi

- [Bun Docs](https://bun.sh/docs)
- [React Docs](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Hero UI](https://www.heroui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 🖊️ License

MIT

---
