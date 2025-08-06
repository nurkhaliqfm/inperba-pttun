const ItemStatistikPerkara = ({
	value,
	title,
}: {
	value: string | number;
	title: string;
}) => {
	return (
		<section className="flex flex-col gap-y-2 items-center text-public-secondary">
			<p className="font-bold text-4xl">{value}</p>
			<div className="h-0.5 w-6 bg-public-accent"></div>
			<p className="text-xs font-thin">{title}</p>
		</section>
	);
};

export default ItemStatistikPerkara;
