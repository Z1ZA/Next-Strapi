function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <strong className="font-extrabold text-blue-700 sm:block">
              AssetStack.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Discover a stack of assets for your projects
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
