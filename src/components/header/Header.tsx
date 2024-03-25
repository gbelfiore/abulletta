"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import useUserStore from "@/zustand/userState";

interface IHeaderProps {
	title: string;
}

const Header = ({ title }: IHeaderProps) => {
	const router = useRouter();

	return (
		<div className={styles.header}>
			<div className="navbar bg-neutral text-neutral-content">
				<div className={styles.headerLogo}>
					<img src={"/logo.png"} alt={"logo"} />
				</div>
				<div className={styles.headerTitle}>{title}</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						{/* <li>
							<a onClick={() => router.push("/days")}>Giornate</a>
						</li>
						<li>
							<a onClick={() => router.push("/championships")}>Campionati</a>
						</li> */}
					</ul>
				</div>

				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src="/user.png" />
						</div>
					</label>
					<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<a onClick={() => useUserStore.getState().logout()}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
