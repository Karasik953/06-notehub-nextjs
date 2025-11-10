import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header style={{ padding: "24px 0" }}>
        <h1 style={{ margin: 0 }}>NoteHub — ваш мінімалістичний менеджер нотаток</h1>
        <p style={{ margin: "8px 0 0" }}>
          Створюй, шукай, переглядай деталі та видаляй нотатки. Кешування та пагінація — під капотом.
        </p>
      </header>

      <nav aria-label="Primary" style={{ margin: "16px 0 32px" }}>
        <Link
          href="/notes"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            border: "1px solid #ddd",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Перейти до нотаток →
        </Link>
      </nav>

      <section aria-labelledby="features-title" style={{ marginBottom: 24 }}>
        <h2 id="features-title">Можливості</h2>
        <ul>
          <li>Пошук з debounce</li>
          <li>Пагінація списку</li>
          <li>Деталі нотатки на /notes/[id]</li>
          <li>Створення та видалення (Formik + React Query мутації)</li>
        </ul>
      </section>

      <section aria-labelledby="tech-title">
        <h2 id="tech-title">Технології</h2>
        <p>Next.js App Router, React Query, Axios, Formik + Yup, SSR з prefetch та гідратацією кешу.</p>
      </section>
    </main>
  );
}