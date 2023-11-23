export default async function Loading() {
  return (
    <section>
      <div className="bg-secondary border border-primary rounded-lg flex gap-2 items-center justify-center p-8">
        <h1>Loading Content</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          className="animate-spin w-6 h-6"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65 2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 000 1h3a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0v1.813C12.296 3.071 10.666.85 7.5.85 3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65 1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 001.428-2.167.5.5 0 10-.925-.38 5.77 5.77 0 01-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643-3.44 0-5.65-2.815-5.65-5.65z"
            clipRule="evenodd"
          ></path>
        </svg>{" "}
      </div>
    </section>
  );
}
