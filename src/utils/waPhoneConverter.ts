export const WaPhoneConverter = (phone: string) => {
	phone = String(phone).trim();
	if (phone.startsWith("+62")) {
		phone = "62" + phone.slice(3);
	} else if (phone.startsWith("62")) {
		phone = "62" + phone.slice(2);
	} else if (phone.startsWith("0")) {
		phone = "62" + phone.slice(1);
	} else {
		phone = "62" + phone;
	}

	return phone.replace(/[- .]/g, "").replace("e", "").replace(" ", "");
};
