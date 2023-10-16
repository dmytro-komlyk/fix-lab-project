import authProvider from "@/authProvider";
import { useState } from "react";
import { useLogin, useNotify, useRedirect } from "react-admin";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
const MyAuthPage = () => {
  const [userLogin, setUserLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useRedirect();

  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginMode) {
        await login({ userLogin, password });
      } else {
        const res = await authProvider.register({
          userLogin,
          email,
          password,
          name,
        });
        if (res) {
          redirect("/");
        }
      }
    } catch (error) {
      notify("Неправильні дані авторизації");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <section className="flex justify-center items-center h-[100vh] bg-gradient-linear-center-blue">
      <div className="drop-shadow-2xl relative max-w-[414px] flex-col items-center justify-center rounded-2xl bg-[#00cc73] p-[50px] max-md:px-[30px] max-sm:px-4">
        <h3 className="mb-8 text-center font-exo_2 text-xl font-semibold leading-[29px] text-white-dis">
          {isLoginMode ? "Авторизація" : "Реєстрація"}
        </h3>
        <form
          className="flex flex-col items-center justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Логін"
            className="h-[58px] w-[302px] rounded-2xl px-6 py-2"
            name="login"
            type="text"
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
          />
          {!isLoginMode && (
            <input
              placeholder="Email"
              className="h-[58px] w-[302px] rounded-2xl px-6 py-2"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <div className="flex items-center relative">
            <input
              placeholder="Пароль"
              className="h-[58px] w-[302px] rounded-2xl px-6 py-2"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={toggleShowPassword}
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-[15px]"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={30} />
              ) : (
                <AiFillEye size={30} />
              )}
            </button>
          </div>
          {!isLoginMode && (
            <input
              placeholder="Ім'я"
              className="h-[58px] w-[302px] rounded-2xl px-6 py-2"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <button
            disabled={loading}
            className="group mt-4 flex h-[56px] w-[297px] items-center justify-center rounded-2xl bg-dark-blue transition-colors hover:bg-black-dis focus:bg-black-dis"
            type="submit"
          >
            {loading ? (
              <ThreeDots
                height="30"
                width="60"
                radius="9"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <p
                className={`whitespace-nowrap text-base font-semibold tracking-[0.64] text-white-dis 
                 `}
              >
                {isLoginMode ? "Увійти" : "Зареєструватися"}
              </p>
            )}
          </button>
        </form>
        <button
          className="text-center w-full mt-4 text-base font-semibold tracking-[0.64] text-light-blue transition-colors hover:text-black-dis focus:text-black-dis"
          onClick={toggleMode}
        >
          {isLoginMode
            ? "Не маєте акаунту? Зареєструйтесь"
            : "Увійти з існуючим акаунтом"}
        </button>
      </div>
    </section>
  );
};

export default MyAuthPage;
