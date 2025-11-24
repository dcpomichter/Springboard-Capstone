import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start" style={{ background: "var(--gradient-bottom)" }}>
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to <span className="text-primary">Board Bums</span>
        </h1>

        <p className="text-lg mb-6 text-gray-700 wrap-break-word">
          Board Bums is your home base for exploring, collecting, and sharing your
          favorite board games. Whether you're a casual player or a dedicated
          strategist, this is your space to discover new titles and connect with
          fellow tabletop fans.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">📚 Explore & Expand the Global Game Library</h2>
            <p className="text-gray-700 wrap-break-word">
              Browse our always-growing collection of board games added by players
              just like you. Don’t see a game you love? Add it to our global
              library and help strengthen the community catalogue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">🎲 Build Your Personal Collection</h2>
            <p className="text-gray-700 wrap-break-word">
              Create your own curated game library by adding titles from the
              global list.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">⭐ Review & Rate Games</h2>
            <p className="text-gray-700 wrap-break-word">
              Share your thoughts on the games you've played. Leave reviews,
              ratings, and insights to help others discover their next favorite
              tabletop experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">👤 Explore User Profiles</h2>
            <p className="text-gray-700 wrap-break-word">
              Visit player profiles to see their collections, reviews, and recent
              activity. Connect with other board game fans and discover people who
              share your taste.
            </p>
          </div>
        </section>
        <Image
          className="dark"
          src="/Board_Bums_logo.png"
          alt="Board Bums logo"
          width={1000}
          height={200}
          priority
        />
      </main>
    </div>
  );
}
