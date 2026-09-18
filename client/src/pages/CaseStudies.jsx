import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectGrid from "../components/projects/ProjectGrid";
import usePublicProjects from "../hooks/usePublicProjects";


function CaseStudies() {
	const {
		projects,
		isLoading,
		error,
		reload,
	} = usePublicProjects();


	const caseStudies = [
		...projects,
	]
		.filter(
			(project) =>
				project.displayType ===
				"case-study"
		)
		.sort(
			(
				firstProject,
				secondProject
			) => {
				const firstOrder =
					Number(
						firstProject.order ??
						999
					);

				const secondOrder =
					Number(
						secondProject.order ??
						999
					);

				if (
					firstOrder !==
					secondOrder
				) {
					return (
						firstOrder -
						secondOrder
					);
				}

				return (
					firstProject.title ||
					""
				).localeCompare(
					secondProject.title ||
					""
				);
			}
		);


	return (
		<>
			<Navbar />

			<main className="home-page projects-page">
				<section
					className="home-section"
					aria-labelledby="case-studies-title"
				>
					<div className="section-heading">
						<p className="eyebrow">
							Case Studies
						</p>

						<h1 id="case-studies-title">
							Case studies.
						</h1>

						<p>
							Deeper project
							stories showing
							how I approached
							product,
							experience, and
							engineering
							decisions.
						</p>
					</div>


					{isLoading && (
						<div
							className="work-project-api-status"
							role="status"
							aria-live="polite"
						>
							<div>
								<strong>
									Loading
									case
									studies...
								</strong>

								<span>
									Getting the
									latest
									published
									project
									content.
								</span>
							</div>
						</div>
					)}


					{!isLoading &&
						error && (
							<div
								className="work-project-api-status work-project-api-status-error"
								role="alert"
							>
								<div>
									<strong>
										Case
										studies are
										temporarily
										unavailable.
									</strong>

									<span>
										Please try
										again.
									</span>
								</div>

								<button
									className="button button-secondary"
									type="button"
									onClick={
										reload
									}
								>
									Try Again
								</button>
							</div>
						)}


					{!isLoading &&
						!error &&
						caseStudies.length >
						0 && (
							<ProjectGrid
								projects={
									caseStudies
								}
							/>
						)}


					{!isLoading &&
						!error &&
						caseStudies.length ===
						0 && (
							<div className="work-project-api-status">
								<div>
									<strong>
										No
										published
										case
										studies
										yet.
									</strong>

									<span>
										Published
										case
										studies
										will
										appear
										here.
									</span>
								</div>
							</div>
						)}
				</section>
			</main>

			<Footer />
		</>
	);
}


export default CaseStudies;