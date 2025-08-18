<template>
  <div class="min-h-screen w-full grid grid-cols-12">
    <!-- Left side -->
      <div class="col-span-6 bg-red-500 flex items-center justify-center">
      <h1 class="text-white text-4xl font-bold bg-red-500 ">Welcome Back!</h1>
    </div>

    <!-- Right side -->
    <div class="col-span-6 flex items-center justify-center p-8 bg-gray-50">
      <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        <form class="space-y-4">
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Sign In
          </button>
        </form>

        <p class="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?
          <a href="#" class="text-indigo-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>
