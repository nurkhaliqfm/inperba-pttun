import {
	CiFacebook,
	CiGlobe,
	CiInstagram,
	CiMail,
	CiYoutube,
} from "react-icons/ci";
import { PiCopyright } from "react-icons/pi";

const PublicFooter = () => {
	return (
		<footer className="w-full bottom-2 flex justify-center items-center border-t-2 border-t-public-accent">
			<div className="flex flex-col w-full max-w-2xl justify-center items-center px-6 py-4">
				<p className="text-public-secondary font-light">INFO-PUTUS v1.0</p>
				<p className="text-public-secondary">
					<PiCopyright className="inline" />{" "}
					<span>
						Copyright <b>2025</b> All Rights Reserved
					</span>
				</p>
				<div className="flex my-4 gap-x-2">
					<a href="#" className="text-public-secondary cursor-pointer">
						<CiFacebook size={35} />
					</a>
					<a
						href="https://pttun-makassar.go.id/"
						className="text-public-secondary cursor-pointer">
						<CiGlobe size={35} />
					</a>
					<a
						href="https://www.instagram.com/pttun.makassar/"
						className="text-public-secondary cursor-pointer">
						<CiInstagram size={35} />
					</a>
					<a
						href="https://www.youtube.com/@pttunmakassar3381"
						className="text-public-secondary cursor-pointer">
						<CiYoutube size={35} />
					</a>
					<a
						href="mailto:pttun.makassar@gmail.com"
						className="text-public-secondary cursor-pointer">
						<CiMail size={35} />
					</a>
				</div>
				<p className="text-public-secondary text-xs font-thin">By 111FMLabs</p>
			</div>
		</footer>
	);
};

export default PublicFooter;
