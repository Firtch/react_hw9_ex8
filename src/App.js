import "./App.css";
import content from "./static";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Пожалуйста введите имя"),
  email: yup.string().required("Вы забыли ввести Email").email(),
  password: yup.string().required("Без пароля, нету входа!").min(5, "Пароль должен содержать минимум 5 символов"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <div className="App">
      <h1>React-hook-form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label className="label">{input.label}</label>
              </p>
              <p>
                <input
                  defaultValue=""
                  type={input.type}
                  name={input.name}
                  className="input"
                  {...register(input.name)}
                />
              </p>
              <p className="messages">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
