import {
	useEffect,
	useRef,
	useState,
} from "react";


function isSafeMediaSource(
	value
) {
	if (
		typeof value !==
		"string"
	) {
		return false;
	}

	const source =
		value.trim();

	if (!source) {
		return false;
	}

	if (
		source.startsWith(
			"/"
		) &&
		!source.startsWith(
			"//"
		)
	) {
		return true;
	}

	if (
		source.startsWith(
			"https://"
		)
	) {
		return true;
	}

	if (
		source.startsWith(
			"http://localhost"
		)
	) {
		return true;
	}

	return false;
}


function getPrimaryMedia(
	media
) {
	if (
		!Array.isArray(media)
	) {
		return null;
	}

	return (
		media.find(
			(item) =>
				item &&
				(
					item.type ===
					"image" ||
					item.type ===
					"video"
				) &&
				isSafeMediaSource(
					item.src
				)
		) || null
	);
}


function CardPlaceholder() {
	return (
		<div
			className="mockup-work-card-media"
			aria-hidden="true"
		>
			<div className="mockup-card-browser-bar">
				<span />
				<span />
				<span />
			</div>

			<div className="mockup-card-screen">
				<div className="mockup-card-screen-block mockup-card-screen-block-large" />

				<div className="mockup-card-screen-row">
					<span />
					<span />
					<span />
				</div>

				<span className="mockup-card-screen-line" />

				<span className="mockup-card-screen-line short" />
			</div>
		</div>
	);
}


function DetailPlaceholder() {
	return (
		<div
			className="case-study-visual-placeholder"
			aria-label="Project visual placeholder"
		>
			<div className="mockup-card-browser-bar">
				<span />
				<span />
				<span />
			</div>

			<div className="case-study-visual-screen">
				<div />
				<span />
				<span />
			</div>
		</div>
	);
}


function ProjectMedia({
	media = [],
	projectTitle = "Project",
	variant = "card",
}) {
	const primaryMedia =
		getPrimaryMedia(
			media
		);

	const wrapperRef =
		useRef(null);

	const [
		shouldLoadVideo,
		setShouldLoadVideo,
	] = useState(false);


	const isDetail =
		variant === "detail";


	useEffect(() => {
		if (
			primaryMedia?.type !==
			"video"
		) {
			setShouldLoadVideo(
				false
			);

			return;
		}


		if (isDetail) {
			setShouldLoadVideo(
				true
			);

			return;
		}


		if (
			typeof IntersectionObserver ===
			"undefined"
		) {
			setShouldLoadVideo(
				true
			);

			return;
		}


		const element =
			wrapperRef.current;

		if (!element) {
			return;
		}


		const observer =
			new IntersectionObserver(
				(entries) => {
					const entry =
						entries[0];

					if (
						entry?.isIntersecting
					) {
						setShouldLoadVideo(
							true
						);

						observer.disconnect();
					}
				},
				{
					rootMargin:
						"200px",
				}
			);


		observer.observe(
			element
		);


		return () => {
			observer.disconnect();
		};
	}, [
		primaryMedia?.src,
		primaryMedia?.type,
		isDetail,
	]);


	if (!primaryMedia) {
		return isDetail
			? <DetailPlaceholder />
			: <CardPlaceholder />;
	}


	const accessibleDescription =
		primaryMedia.alt?.trim() ||
		`Preview of ${projectTitle}`;


	const wrapperClassName =
		isDetail
			? "case-study-visual-placeholder case-study-visual-media"
			: "mockup-work-card-media mockup-work-card-media-real";


	const imageClassName =
		isDetail
			? "case-study-visual-image"
			: "mockup-work-card-media-image";


	const videoClassName =
		isDetail
			? "case-study-visual-video"
			: "mockup-work-card-media-video";


	if (
		primaryMedia.type ===
		"image"
	) {
		return (
			<div
				className={
					wrapperClassName
				}
				ref={
					wrapperRef
				}
			>
				<img
					className={
						imageClassName
					}
					src={
						primaryMedia.src
					}
					alt={
						accessibleDescription
					}
					loading={
						isDetail
							? "eager"
							: "lazy"
					}
					decoding="async"
					fetchPriority={
						isDetail
							? "high"
							: "auto"
					}
				/>
			</div>
		);
	}


	return (
		<div
			className={
				wrapperClassName
			}
			ref={
				wrapperRef
			}
		>
			{shouldLoadVideo ? (
				<video
					className={
						videoClassName
					}
					src={
						primaryMedia.src
					}
					aria-label={
						accessibleDescription
					}
					autoPlay={
						!isDetail
					}
					controls={
						isDetail
					}
					muted
					loop={
						!isDetail
					}
					playsInline
					preload="metadata"
				>
					Your browser does
					not support this
					project video.
				</video>
			) : (
				<div
					className={
						isDetail
							? "case-study-visual-media-loading"
							: "mockup-work-card-media-loading"
					}
					aria-hidden="true"
				/>
			)}
		</div>
	);
}


export default ProjectMedia;