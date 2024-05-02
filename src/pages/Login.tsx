import { ILogin } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/queries/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import Logo from "@/components/Logo";
import { StorageKeys } from "@/constants/storageKeys";

const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Логин должен быть не менее 3 символов")
    .max(32, "Логин должен быть не более 32 символов")
    .required("Это поле обязательное"),
  password: Yup.string()
    .min(4, "Пароль должен быть не менее 6 символов")
    .required("Это поле обязательное"),
});

export default function Login() {
  const navigate = useNavigate();

  const loginForm = useForm<ILogin>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
  });

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      navigate(ROUTES.DASHBOARD);
      localStorage.setItem(StorageKeys.TOKEN, data.token);
      toast.success("Авторизация успешна!");
    },
    onError: () => {
      toast.error("Неверный логин или пароль");
    },
  });

  const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
    login(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Logo />
      <Card className="mt-10 w-92 md:w-[360px]">
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <Controller
              name="username"
              control={loginForm.control}
              render={({ field }) => (
                <Input
                  label="Логин"
                  placeholder="Введите логин..."
                  errorMessage={loginForm.formState.errors.username?.message}
                  isInvalid={!!loginForm.formState.errors.username}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={loginForm.control}
              render={({ field }) => (
                <Input
                  label="Пароль"
                  placeholder="Введите пароль..."
                  errorMessage={loginForm.formState.errors.password?.message}
                  isInvalid={!!loginForm.formState.errors.password}
                  type="password"
                  {...field}
                />
              )}
            />

            <Button
              color="primary"
              type="submit"
              isLoading={isPending}
              isDisabled={Object.values(loginForm.formState.errors).length > 0}
            >
              Войти
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
