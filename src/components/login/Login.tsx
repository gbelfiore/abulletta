"use client";
import { ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { loginUser } from "@/services/UserServices";
import useUserStore from "@/zustand/userState";

interface ILogin {
	children: ReactNode;
}

const Login = ({ children }: ILogin) => {
	const user = useUserStore((state) => state.user);
	console.log({ user });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLogin>({
		defaultValues: user ?? undefined,
	});

	const onSubmit = useCallback(async (data: IUserLogin) => {
		const result = await loginUser(data);
		if (!result.error) {
			useUserStore.getState().login(result.data.user, result.data.session);
		} else {
			alert(result.error.message);
		}
	}, []);

	return (
		<>
			{user && children}

			{!user && (
				<div className={styles.login}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.loginLogo}>
							<img src={"/logo.png"} alt={"logo"} />
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">E-Mail</span>
							</label>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
								{...register("email", { required: "nome obbligatorio" })}
							/>
							{errors.email && (
								<label className="label">
									<span className="label-text-alt text-red-500">{errors.email.message}</span>
								</label>
							)}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Type here"
								className="input input-bordered w-full"
								{...register("password", { required: "cognome obbligatorio" })}
							/>
							{errors.password && (
								<label className="label">
									<span className="label-text-alt text-red-500">{errors.password.message}</span>
								</label>
							)}
						</div>

						<div className="mt-4 text-right flex flex-row gap-2 justify-center">
							<input className="btn " type="submit" value={"login"} />
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
