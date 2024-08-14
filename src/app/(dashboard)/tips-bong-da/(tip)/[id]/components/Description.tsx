function Description({ descript }: { descript: string }) {
	return (
		<div className="mt-4 p-4 bg-light rounded-lg shadow-md overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: descript }} />
		</div>
	);
}

export default Description;
