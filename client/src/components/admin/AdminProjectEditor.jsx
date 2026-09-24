import { useEffect, useState } from "react";
import AdminProjectMediaEditor from "./AdminProjectMediaEditor";

const ROLE_LENS_OPTIONS = [
     {
          value: "product",
          label: "Product",
     },
     {
          value: "ux-ui",
          label: "UI/UX",
     },
     {
          value: "engineering",
          label: "Engineering",
     },
];


const DISPLAY_TYPE_OPTIONS = [
     {
          value: "case-study",
          label: "Case Study",
     },
     {
          value: "experience",
          label: "Experience",
     },
     {
          value: "project",
          label: "Project",
     },
     {
          value: "leadership",
          label: "Leadership",
     },
];


function arrayToLines(value) {
     return Array.isArray(value)
          ? value.join("\n")
          : "";
}


function linesToArray(value) {
     return value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
}


function formatImpactStats(stats) {
     if (!Array.isArray(stats)) {
          return "";
     }

     return stats
          .map((stat) => {
               const label =
                    stat?.label || "";

               const value =
                    stat?.value || "";

               return `${label} | ${value}`;
          })
          .join("\n");
}


function parseImpactStats(value) {
     const lines =
          value
               .split("\n")
               .map((line) => line.trim())
               .filter(Boolean);

     return lines.map(
          (line, index) => {
               const separatorIndex =
                    line.indexOf("|");

               if (separatorIndex === -1) {
                    throw new Error(
                         `Impact stat line ${index + 1} must use: Label | Value`
                    );
               }

               const label =
                    line
                         .slice(
                              0,
                              separatorIndex
                         )
                         .trim();

               const statValue =
                    line
                         .slice(
                              separatorIndex + 1
                         )
                         .trim();

               if (
                    !label ||
                    !statValue
               ) {
                    throw new Error(
                         `Impact stat line ${index + 1} needs both a label and value.`
                    );
               }

               return {
                    label,
                    value: statValue,
               };
          }
     );
}


function formatMonthInput(value) {
     if (!value) {
          return "";
     }

     const date =
          new Date(value);

     if (
          Number.isNaN(
               date.getTime()
          )
     ) {
          return "";
     }

     const year =
          date
               .getUTCFullYear()
               .toString();

     const month =
          String(
               date.getUTCMonth() + 1
          ).padStart(
               2,
               "0"
          );

     return `${year}-${month}`;
}


function buildEditorState(project) {
     const draft =
          project?.draft || {};

     const caseStudy =
          draft.caseStudy || {};

     return {
          slug:
               project?.slug || "",

          title:
               draft.title || "",

          subtitle:
               draft.subtitle || "",

          type:
               draft.type || "",

          displayType:
               draft.displayType ||
               "project",

          status:
               draft.status || "",

          featured:
               Boolean(
                    draft.featured
               ),

          role:
               draft.role || "",

          audience:
               draft.audience || "",

          location:
               draft.location || "",

          date:
               draft.date || "",

          sortDate:
               formatMonthInput(
                    draft.sortDate
               ),

          summary:
               draft.summary || "",

          shortValue:
               draft.shortValue || "",

          problem:
               draft.problem || "",

          solution:
               draft.solution || "",

          impact:
               draft.impact || "",

          cardOutcome:
               draft.cardOutcome || "",

          detailCta:
               draft.detailCta || "",

          media:
               Array.isArray(
                    draft.media
               )
                    ? draft.media.map(
                         (item) => ({
                              type:
                                   item?.type ||
                                   "image",

                              src:
                                   item?.src ||
                                   "",

                              alt:
                                   item?.alt ||
                                   "",

                              caption:
                                   item?.caption ||
                                   "",
                         })
                    )
                    : [],

          roleLens:
               Array.isArray(
                    draft.roleLens
               )
                    ? draft.roleLens
                    : [],

          thinkingLensesText:
               arrayToLines(
                    draft.thinkingLenses
               ),

          proofPointsText:
               arrayToLines(
                    draft.proofPoints
               ),

          impactStatsText:
               formatImpactStats(
                    draft.impactStats
               ),

          toolsText:
               arrayToLines(
                    draft.tools
               ),

          skillsText:
               arrayToLines(
                    draft.skills
               ),

          cardTagsText:
               arrayToLines(
                    draft.cardTags
               ),

          searchableTagsText:
               arrayToLines(
                    draft.searchableTags
               ),

          caseStudyContext:
               caseStudy.context || "",

          caseStudyUserNeed:
               caseStudy.userNeed || "",

          constraintsText:
               arrayToLines(
                    caseStudy.constraints
               ),

          productDecisionsText:
               arrayToLines(
                    caseStudy.productDecisions
               ),

          designDecisionsText:
               arrayToLines(
                    caseStudy.designDecisions
               ),

          engineeringDecisionsText:
               arrayToLines(
                    caseStudy.engineeringDecisions
               ),

          tradeoffsText:
               arrayToLines(
                    caseStudy.tradeoffs
               ),

          nextStepsText:
               arrayToLines(
                    caseStudy.nextSteps
               ),
     };
}


function buildDraftPayload(formData) {
     const slug =
          formData.slug.trim();

     const title =
          formData.title.trim();

     if (!slug) {
          throw new Error(
               "Slug is required."
          );
     }

     if (
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
               slug
          )
     ) {
          throw new Error(
               "Slug can use lowercase letters, numbers, and hyphens only."
          );
     }

     if (!title) {
          throw new Error(
               "Project title is required."
          );
     }

     const sortDate =
          formData.sortDate
               ? `${formData.sortDate}-01T00:00:00.000Z`
               : null;

     return {
          slug,

          draft: {
               title,

               subtitle:
                    formData.subtitle.trim(),

               type:
                    formData.type.trim(),

               displayType:
                    formData.displayType,

               status:
                    formData.status.trim(),

               featured:
                    formData.featured,

               role:
                    formData.role.trim(),

               audience:
                    formData.audience.trim(),

               location:
                    formData.location.trim(),

               date:
                    formData.date.trim(),

               sortDate,



               summary:
                    formData.summary.trim(),

               shortValue:
                    formData.shortValue.trim(),

               problem:
                    formData.problem.trim(),

               solution:
                    formData.solution.trim(),

               impact:
                    formData.impact.trim(),

               cardOutcome:
                    formData.cardOutcome.trim(),

               detailCta:
                    formData.detailCta.trim(),

               roleLens:
                    formData.roleLens,

               thinkingLenses:
                    linesToArray(
                         formData.thinkingLensesText
                    ),

               proofPoints:
                    linesToArray(
                         formData.proofPointsText
                    ),

               impactStats:
                    parseImpactStats(
                         formData.impactStatsText
                    ),
               media:
                    formData.media
                         .filter(
                              (item) =>
                                   item.src
                                        .trim()
                         )
                         .map(
                              (item) => ({
                                   type:
                                        item.type,

                                   src:
                                        item.src
                                             .trim(),

                                   alt:
                                        item.alt
                                             .trim(),

                                   caption:
                                        item.caption
                                             .trim(),
                              })
                         ),

               tools:
                    linesToArray(
                         formData.toolsText
                    ),

               skills:
                    linesToArray(
                         formData.skillsText
                    ),

               cardTags:
                    linesToArray(
                         formData.cardTagsText
                    ),

               searchableTags:
                    linesToArray(
                         formData.searchableTagsText
                    ),

               caseStudy: {
                    context:
                         formData.caseStudyContext.trim(),

                    userNeed:
                         formData.caseStudyUserNeed.trim(),

                    constraints:
                         linesToArray(
                              formData.constraintsText
                         ),

                    productDecisions:
                         linesToArray(
                              formData.productDecisionsText
                         ),

                    designDecisions:
                         linesToArray(
                              formData.designDecisionsText
                         ),

                    engineeringDecisions:
                         linesToArray(
                              formData.engineeringDecisionsText
                         ),

                    tradeoffs:
                         linesToArray(
                              formData.tradeoffsText
                         ),

                    nextSteps:
                         linesToArray(
                              formData.nextStepsText
                         ),
               },
          },
     };
}


function AdminProjectEditor({
     project,
     onBack,
     onSaved,
}) {
     const [
          formData,
          setFormData,
     ] = useState(
          () =>
               buildEditorState(
                    project
               )
     );

     const [
          baseline,
          setBaseline,
     ] = useState(
          () =>
               JSON.stringify(
                    buildEditorState(
                         project
                    )
               )
     );

     const [
          saveMessage,
          setSaveMessage,
     ] = useState("");

     const [
          isSaving,
          setIsSaving,
     ] = useState(false);

     const [
          isPublishing,
          setIsPublishing,
     ] = useState(false);

     const [
          isPreviewOpen,
          setIsPreviewOpen,
     ] = useState(false);

     useEffect(
          () => {
               const nextState =
                    buildEditorState(
                         project
                    );

               setFormData(
                    nextState
               );

               setBaseline(
                    JSON.stringify(
                         nextState
                    )
               );

               setSaveMessage("");
          },
          [project]
     );


     const isDirty =
          JSON.stringify(
               formData
          ) !== baseline;


     function handleFieldChange(
          event
     ) {
          const {
               name,
               type,
               checked,
               value,
          } = event.target;

          setFormData(
               (currentData) => ({
                    ...currentData,
                    [name]:
                         type ===
                              "checkbox"
                              ? checked
                              : value,
               })
          );

          setSaveMessage("");
     }
     function handleMediaChange(
          nextMedia
     ) {
          setFormData(
               (currentData) => ({
                    ...currentData,

                    media:
                         nextMedia,
               })
          );
     }


     function handleRoleLensToggle(
          lens
     ) {
          setFormData(
               (currentData) => {
                    const alreadySelected =
                         currentData.roleLens.includes(
                              lens
                         );

                    return {
                         ...currentData,

                         roleLens:
                              alreadySelected
                                   ? currentData.roleLens.filter(
                                        (
                                             currentLens
                                        ) =>
                                             currentLens !==
                                             lens
                                   )
                                   : [
                                        ...currentData.roleLens,
                                        lens,
                                   ],
                    };
               }
          );

          setSaveMessage("");
     }


     function handleBack() {
          if (isDirty) {
               const shouldLeave =
                    window.confirm(
                         "Discard unsaved draft changes and return to the project list?"
                    );

               if (
                    !shouldLeave
               ) {
                    return;
               }
          }

          onBack();
     }

     async function handlePublicationAction(action) {
          if (isDirty) {
               setSaveMessage(
                    "Save your draft changes before publishing."
               );

               return;
          }

          const isPublishingAction =
               action === "publish";

          const confirmationMessage =
               isPublishingAction
                    ? "Publish the current draft? This will replace the live published snapshot."
                    : "Unpublish this project? Its published snapshot will be preserved, but the project will no longer be marked as published.";

          const confirmed =
               window.confirm(
                    confirmationMessage
               );

          if (!confirmed) {
               return;
          }

          try {
               setIsPublishing(true);

               setSaveMessage(
                    isPublishingAction
                         ? "Publishing project..."
                         : "Unpublishing project..."
               );

               const response =
                    await fetch(
                         `/api/admin/projects/${project._id}/${action}`,
                         {
                              method: "POST",

                              headers: {
                                   "X-Portfolio-Admin-Request":
                                        "1",
                              },

                              credentials:
                                   "include",
                         }
                    );

               const result =
                    await response.json();

               if (!response.ok) {
                    throw new Error(
                         result.message ||
                         `Unable to ${action} project.`
                    );
               }

               setSaveMessage(
                    result.message ||
                    (isPublishingAction
                         ? "Project published."
                         : "Project unpublished.")
               );

               if (onSaved) {
                    await onSaved(
                         project._id
                    );
               }
          } catch (error) {
               setSaveMessage(
                    error.message ||
                    `Unable to ${action} project.`
               );
          } finally {
               setIsPublishing(false);
          }
     }

     async function handleSaveDraft(
          event
     ) {
          event.preventDefault();

          try {
               setIsSaving(true);

               setSaveMessage(
                    "Saving draft..."
               );

               const payload =
                    buildDraftPayload(
                         formData
                    );

               const response =
                    await fetch(
                         `/api/admin/projects/${project._id}`,
                         {
                              method:
                                   "PATCH",

                              headers: {
                                   "Content-Type":
                                        "application/json",

                                   "X-Portfolio-Admin-Request":
                                        "1",
                              },

                              credentials:
                                   "include",

                              body:
                                   JSON.stringify(
                                        payload
                                   ),
                         }
                    );

               const result =
                    await response.json();

               if (
                    !response.ok
               ) {
                    throw new Error(
                         result.message ||
                         "Unable to save project draft."
                    );
               }

               setBaseline(
                    JSON.stringify(
                         formData
                    )
               );

               setSaveMessage(
                    result.message ||
                    "Draft saved."
               );

               if (onSaved) {
                    try {
                         await onSaved(
                              project._id
                         );
                    } catch (error) {
                         setSaveMessage(
                              "Draft saved, but the dashboard could not refresh the latest project data."
                         );
                    }
               }
          } catch (error) {
               setSaveMessage(
                    error.message ||
                    "Unable to save project draft."
               );
          } finally {
               setIsSaving(false);
          }
     }


     return (
          <div className="admin-project-editor">
               <div className="admin-project-editor-header">
                    <div>
                         <p className="eyebrow">
                              Edit Draft
                         </p>

                         <h2>
                              {project.draft
                                   ?.title ||
                                   project.slug}
                         </h2>

                         <p>
                              Changes here update
                              only the draft
                              snapshot. Published
                              content remains
                              unchanged until a
                              separate publish
                              action.
                         </p>
                    </div>

                    <button
                         className="button button-secondary"
                         type="button"
                         onClick={
                              handleBack
                         }
                         disabled={
                              isSaving
                         }
                    >
                         Back to Projects
                    </button>
               </div>

               <div className="admin-project-editor-safety">
                    <strong>
                         Draft mode
                    </strong>

                    <span>
                         Publication status:{" "}
                         {
                              project.publicationStatus
                         }
                    </span>

                    <span>
                         Revision:{" "}
                         {project.revision ??
                              0}
                    </span>
               </div>

               <div className="admin-editor-publication-actions">
                    <button
                         className="button button-secondary"
                         type="button"
                         onClick={() =>
                              setIsPreviewOpen(
                                   (currentValue) =>
                                        !currentValue
                              )
                         }
                    >
                         {isPreviewOpen
                              ? "Close Preview"
                              : "Preview Draft"}
                    </button>

                    {project.publicationStatus ===
                         "published" ? (
                         <button
                              className="button button-secondary"
                              type="button"
                              onClick={() =>
                                   handlePublicationAction(
                                        "unpublish"
                                   )
                              }
                              disabled={
                                   isPublishing
                              }
                         >
                              {isPublishing
                                   ? "Working..."
                                   : "Unpublish"}
                         </button>
                    ) : null}

                    <button
                         className="button button-primary"
                         type="button"
                         onClick={() =>
                              handlePublicationAction(
                                   "publish"
                              )
                         }
                         disabled={
                              isPublishing ||
                              isDirty
                         }
                    >
                         {isPublishing
                              ? "Publishing..."
                              : project.publicationStatus ===
                                   "published"
                                   ? "Publish New Revision"
                                   : "Publish Draft"}
                    </button>
               </div>

               {isPreviewOpen && (
                    <section className="admin-draft-preview">
                         <div>
                              <p className="eyebrow">
                                   Draft Preview
                              </p>

                              <h2>
                                   {formData.title ||
                                        "Untitled Project"}
                              </h2>

                              {formData.subtitle && (
                                   <p className="admin-draft-preview-subtitle">
                                        {
                                             formData.subtitle
                                        }
                                   </p>
                              )}
                         </div>

                         <div className="admin-draft-preview-meta">
                              <span>
                                   {
                                        formData.displayType
                                   }
                              </span>

                              <span>
                                   {formData.status ||
                                        "No status"}
                              </span>

                              {formData.featured && (
                                   <span>
                                        Featured
                                   </span>
                              )}
                         </div>

                         {formData.summary && (
                              <p>
                                   {
                                        formData.summary
                                   }
                              </p>
                         )}

                         {formData.cardOutcome && (
                              <div>
                                   <strong>
                                        Outcome
                                   </strong>

                                   <p>
                                        {
                                             formData.cardOutcome
                                        }
                                   </p>
                              </div>
                         )}

                         <div className="admin-project-lenses">
                              {formData.roleLens.map(
                                   (lens) => (
                                        <span
                                             className="admin-project-lens"
                                             key={
                                                  lens
                                             }
                                        >
                                             {lens}
                                        </span>
                                   )
                              )}
                         </div>

                         <p className="admin-draft-preview-note">
                              Admin-only draft
                              preview. Nothing here
                              becomes published until
                              you use the Publish
                              action.
                         </p>
                    </section>
               )}

               <form
                    className="admin-project-editor-form"
                    onSubmit={
                         handleSaveDraft
                    }
               >
                    <details
                         className="admin-editor-section admin-editor-collapsible"
                         open
                    >
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Project identity
                                   </h3>

                                   <p>
                                        Core information
                                        used by project
                                        cards and detail
                                        pages.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>

                         <div className="admin-editor-grid admin-editor-grid-two">
                              <div className="form-field">
                                   <label htmlFor="project-editor-title">
                                        Title
                                   </label>

                                   <input
                                        id="project-editor-title"
                                        name="title"
                                        type="text"
                                        value={
                                             formData.title
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        required
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-slug">
                                        Slug
                                   </label>

                                   <input
                                        id="project-editor-slug"
                                        name="slug"
                                        type="text"
                                        value={
                                             formData.slug
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        required
                                   />

                                   <small>
                                        Lowercase
                                        letters,
                                        numbers, and
                                        hyphens only.
                                   </small>
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-subtitle">
                                        Subtitle
                                   </label>

                                   <input
                                        id="project-editor-subtitle"
                                        name="subtitle"
                                        type="text"
                                        value={
                                             formData.subtitle
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-type">
                                        Project type
                                   </label>

                                   <input
                                        id="project-editor-type"
                                        name="type"
                                        type="text"
                                        value={
                                             formData.type
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-display-type">
                                        Display type
                                   </label>

                                   <select
                                        id="project-editor-display-type"
                                        name="displayType"
                                        value={
                                             formData.displayType
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   >
                                        {DISPLAY_TYPE_OPTIONS.map(
                                             (
                                                  option
                                             ) => (
                                                  <option
                                                       key={
                                                            option.value
                                                       }
                                                       value={
                                                            option.value
                                                       }
                                                  >
                                                       {
                                                            option.label
                                                       }
                                                  </option>
                                             )
                                        )}
                                   </select>
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-status">
                                        Content status
                                   </label>

                                   <input
                                        id="project-editor-status"
                                        name="status"
                                        type="text"
                                        value={
                                             formData.status
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        placeholder="Completed"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-role">
                                        Role
                                   </label>

                                   <input
                                        id="project-editor-role"
                                        name="role"
                                        type="text"
                                        value={
                                             formData.role
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-audience">
                                        Audience
                                   </label>

                                   <input
                                        id="project-editor-audience"
                                        name="audience"
                                        type="text"
                                        value={
                                             formData.audience
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-location">
                                        Location
                                   </label>

                                   <input
                                        id="project-editor-location"
                                        name="location"
                                        type="text"
                                        value={
                                             formData.location
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-date">
                                        Display date
                                   </label>

                                   <input
                                        id="project-editor-date"
                                        name="date"
                                        type="text"
                                        value={
                                             formData.date
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        placeholder="May 2025 - Aug 2025"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-sort-date">
                                        Sort month
                                   </label>

                                   <input
                                        id="project-editor-sort-date"
                                        name="sortDate"
                                        type="month"
                                        value={
                                             formData.sortDate
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-order">
                                        Portfolio position
                                   </label>

                                   <input
                                        id="project-editor-order"
                                        type="text"
                                        value={
                                             project.draft?.order ??
                                             project.published?.order ??
                                             "Not set"
                                        }
                                        readOnly
                                        aria-readonly="true"
                                   />

                                   <small>
                                        Position is managed from
                                        the Projects list using
                                        Move Up, Move Down, or
                                        Position.
                                   </small>
                              </div>
                         </div>

                         <label className="admin-editor-check">
                              <input
                                   name="featured"
                                   type="checkbox"
                                   checked={
                                        formData.featured
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                              />

                              Featured project
                         </label>
                    </details>
                    <details className="admin-editor-section admin-editor-collapsible">
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Role lens
                                   </h3>

                                   <p>
                                        Only the three
                                        current public
                                        role lenses live
                                        here.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>

                         <div className="admin-editor-role-lenses">
                              {ROLE_LENS_OPTIONS.map(
                                   (option) => (
                                        <label
                                             className="admin-editor-check"
                                             key={
                                                  option.value
                                             }
                                        >
                                             <input
                                                  type="checkbox"
                                                  checked={formData.roleLens.includes(
                                                       option.value
                                                  )}
                                                  onChange={() =>
                                                       handleRoleLensToggle(
                                                            option.value
                                                       )
                                                  }
                                             />

                                             {
                                                  option.label
                                             }
                                        </label>
                                   )
                              )}
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-thinking-lenses">
                                   Thinking lenses
                              </label>

                              <textarea
                                   id="project-editor-thinking-lenses"
                                   name="thinkingLensesText"
                                   value={
                                        formData.thinkingLensesText
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="5"
                                   placeholder={"Product\nUX/UI\nSystems\nEngineering"}
                              />

                              <small>
                                   One item per
                                   line. These may
                                   include Systems,
                                   Data, Research,
                                   AI, and other
                                   supporting
                                   perspectives.
                              </small>
                         </div>
                    </details>

                    <details className="admin-editor-section admin-editor-collapsible">
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Project story
                                   </h3>

                                   <p>
                                        Summary, problem,
                                        solution, impact,
                                        and card messaging.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>
                         <div className="form-field">
                              <label htmlFor="project-editor-summary">
                                   Summary
                              </label>

                              <textarea
                                   id="project-editor-summary"
                                   name="summary"
                                   value={
                                        formData.summary
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="4"
                              />
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-short-value">
                                   Short value
                              </label>

                              <textarea
                                   id="project-editor-short-value"
                                   name="shortValue"
                                   value={
                                        formData.shortValue
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="3"
                              />
                         </div>

                         <div className="admin-editor-grid admin-editor-grid-two">
                              <div className="form-field">
                                   <label htmlFor="project-editor-problem">
                                        Problem
                                   </label>

                                   <textarea
                                        id="project-editor-problem"
                                        name="problem"
                                        value={
                                             formData.problem
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="6"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-solution">
                                        Solution
                                   </label>

                                   <textarea
                                        id="project-editor-solution"
                                        name="solution"
                                        value={
                                             formData.solution
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="6"
                                   />
                              </div>
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-impact">
                                   Impact
                              </label>

                              <textarea
                                   id="project-editor-impact"
                                   name="impact"
                                   value={
                                        formData.impact
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="4"
                              />
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-card-outcome">
                                   Card outcome
                              </label>

                              <textarea
                                   id="project-editor-card-outcome"
                                   name="cardOutcome"
                                   value={
                                        formData.cardOutcome
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="3"
                              />
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-detail-cta">
                                   Detail CTA
                              </label>

                              <input
                                   id="project-editor-detail-cta"
                                   name="detailCta"
                                   type="text"
                                   value={
                                        formData.detailCta
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                              />
                         </div>
                    </details>

                    <details className="admin-editor-section admin-editor-collapsible">
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Evidence
                                   </h3>

                                   <p>
                                        Proof points,
                                        impact stats,
                                        tools, skills,
                                        and tags.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>                         <div className="admin-editor-grid admin-editor-grid-two">
                              <div className="form-field">
                                   <label htmlFor="project-editor-proof-points">
                                        Proof points
                                   </label>

                                   <textarea
                                        id="project-editor-proof-points"
                                        name="proofPointsText"
                                        value={
                                             formData.proofPointsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-impact-stats">
                                        Impact stats
                                   </label>

                                   <textarea
                                        id="project-editor-impact-stats"
                                        name="impactStatsText"
                                        value={
                                             formData.impactStatsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                        placeholder={"Support tickets | -75%\nConfiguration time | -70%"}
                                   />

                                   <small>
                                        One per line
                                        using:
                                        Label | Value
                                   </small>
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-tools">
                                        Tools
                                   </label>

                                   <textarea
                                        id="project-editor-tools"
                                        name="toolsText"
                                        value={
                                             formData.toolsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="7"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-skills">
                                        Skills
                                   </label>

                                   <textarea
                                        id="project-editor-skills"
                                        name="skillsText"
                                        value={
                                             formData.skillsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="7"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-card-tags">
                                        Card tags
                                   </label>

                                   <textarea
                                        id="project-editor-card-tags"
                                        name="cardTagsText"
                                        value={
                                             formData.cardTagsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="6"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-searchable-tags">
                                        Searchable tags
                                   </label>

                                   <textarea
                                        id="project-editor-searchable-tags"
                                        name="searchableTagsText"
                                        value={
                                             formData.searchableTagsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="6"
                                   />
                              </div>
                         </div>
                    </details>

                    <details className="admin-editor-section admin-editor-collapsible">
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Case study
                                   </h3>

                                   <p>
                                        Context, user
                                        needs, decisions,
                                        tradeoffs, and
                                        next steps.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>

                         <div className="form-field">
                              <label htmlFor="project-editor-context">
                                   Context
                              </label>

                              <textarea
                                   id="project-editor-context"
                                   name="caseStudyContext"
                                   value={
                                        formData.caseStudyContext
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="5"
                              />
                         </div>

                         <div className="form-field">
                              <label htmlFor="project-editor-user-need">
                                   User need
                              </label>

                              <textarea
                                   id="project-editor-user-need"
                                   name="caseStudyUserNeed"
                                   value={
                                        formData.caseStudyUserNeed
                                   }
                                   onChange={
                                        handleFieldChange
                                   }
                                   rows="5"
                              />
                         </div>

                         <div className="admin-editor-grid admin-editor-grid-two">
                              <div className="form-field">
                                   <label htmlFor="project-editor-constraints">
                                        Constraints
                                   </label>

                                   <textarea
                                        id="project-editor-constraints"
                                        name="constraintsText"
                                        value={
                                             formData.constraintsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-product-decisions">
                                        Product decisions
                                   </label>

                                   <textarea
                                        id="project-editor-product-decisions"
                                        name="productDecisionsText"
                                        value={
                                             formData.productDecisionsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-design-decisions">
                                        Design decisions
                                   </label>

                                   <textarea
                                        id="project-editor-design-decisions"
                                        name="designDecisionsText"
                                        value={
                                             formData.designDecisionsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-engineering-decisions">
                                        Engineering decisions
                                   </label>

                                   <textarea
                                        id="project-editor-engineering-decisions"
                                        name="engineeringDecisionsText"
                                        value={
                                             formData.engineeringDecisionsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-tradeoffs">
                                        Tradeoffs
                                   </label>

                                   <textarea
                                        id="project-editor-tradeoffs"
                                        name="tradeoffsText"
                                        value={
                                             formData.tradeoffsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>

                              <div className="form-field">
                                   <label htmlFor="project-editor-next-steps">
                                        Next steps
                                   </label>

                                   <textarea
                                        id="project-editor-next-steps"
                                        name="nextStepsText"
                                        value={
                                             formData.nextStepsText
                                        }
                                        onChange={
                                             handleFieldChange
                                        }
                                        rows="8"
                                   />
                              </div>
                         </div>
                    </details>
                    <details
                         className="admin-editor-section admin-editor-collapsible admin-editor-media-section"
                         open={
                              formData.media.length >
                              0
                         }
                    >
                         <summary className="admin-editor-section-heading">
                              <div>
                                   <h3>
                                        Project media
                                   </h3>

                                   <p>
                                        Add screenshots,
                                        product visuals,
                                        diagrams, or video
                                        evidence for this
                                        project.
                                   </p>
                              </div>

                              <span
                                   className="admin-editor-section-toggle"
                                   aria-hidden="true"
                              >
                                   +
                              </span>
                         </summary>

                         <div className="admin-editor-media-panel">
                              <AdminProjectMediaEditor
                                   value={
                                        formData.media
                                   }
                                   onChange={
                                        handleMediaChange
                                   }
                              />
                         </div>
                    </details>
                    <div className="admin-editor-actions">
                         <div>
                              <strong>
                                   {isDirty
                                        ? "Unsaved changes"
                                        : "Draft is up to date"}
                              </strong>

                              <span>
                                   Saving does not
                                   publish this
                                   project.
                              </span>
                         </div>

                         <div className="admin-editor-button-row">
                              <button
                                   className="button button-secondary"
                                   type="button"
                                   onClick={
                                        handleBack
                                   }
                                   disabled={
                                        isSaving
                                   }
                              >
                                   Cancel
                              </button>

                              <button
                                   className="button button-primary"
                                   type="submit"
                                   disabled={
                                        isSaving ||
                                        !isDirty
                                   }
                              >
                                   {isSaving
                                        ? "Saving..."
                                        : "Save Draft"}
                              </button>
                         </div>
                    </div>

                    {saveMessage && (
                         <p
                              className="form-status"
                              aria-live="polite"
                         >
                              {
                                   saveMessage
                              }
                         </p>
                    )}
               </form>
          </div>
     );
}


export default AdminProjectEditor;