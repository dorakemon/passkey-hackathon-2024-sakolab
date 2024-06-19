export default () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex h-screen w-full">
        <div className="w-1/2 h-full hidden lg:block">
          <img
            src="/id.webp"
            alt="ID Card Demo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-gray-900">
          <div className="max-w-lg w-full space-y-8 p-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">基本4属性</h2>
              <p className="mt-2 text-sm text-gray-400">
                デモに当たり、IDカードに含めたい情報を入力してください。
              </p>
              <p className="mt-2 text-sm text-red-400">
                ※ 実際の情報は入力しないでください。
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400"
                >
                  氏名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-400"
                >
                  住所
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium text-gray-400"
                >
                  誕生日
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-400"
                >
                  性別
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                >
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  発行
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
