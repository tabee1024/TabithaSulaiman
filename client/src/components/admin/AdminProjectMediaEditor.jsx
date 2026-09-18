function createEmptyMediaItem() {
    return {
        type: "image",
        src: "",
        alt: "",
        caption: "",
    };
}


function AdminProjectMediaEditor({
    value = [],
    onChange,
}) {
    const media =
        Array.isArray(value)
            ? value
            : [];


    function updateMediaItem(
        index,
        field,
        fieldValue
    ) {
        const nextMedia =
            media.map(
                (
                    item,
                    itemIndex
                ) =>
                    itemIndex ===
                        index
                        ? {
                            ...item,
                            [field]:
                                fieldValue,
                        }
                        : item
            );

        onChange(
            nextMedia
        );
    }


    function addMediaItem() {
        onChange([
            ...media,
            createEmptyMediaItem(),
        ]);
    }


    function removeMediaItem(
        index
    ) {
        const confirmed =
            window.confirm(
                "Remove this media item from the draft?"
            );

        if (!confirmed) {
            return;
        }

        onChange(
            media.filter(
                (
                    _item,
                    itemIndex
                ) =>
                    itemIndex !==
                    index
            )
        );
    }


    function moveMediaItem(
        index,
        direction
    ) {
        const targetIndex =
            index + direction;

        if (
            targetIndex < 0 ||
            targetIndex >=
            media.length
        ) {
            return;
        }

        const nextMedia = [
            ...media,
        ];

        const [
            movedItem,
        ] =
            nextMedia.splice(
                index,
                1
            );

        nextMedia.splice(
            targetIndex,
            0,
            movedItem
        );

        onChange(
            nextMedia
        );
    }


    return (
        <section className="admin-editor-section">
            <div className="admin-editor-section-heading">
                <div>
                    <p className="eyebrow">
                        Project Media
                    </p>

                    <h2>
                        Images & Videos
                    </h2>
                </div>

                <p>
                    The first valid
                    media item is used
                    as the Work-card
                    preview.
                </p>
            </div>


            <div className="admin-media-help">
                <strong>
                    Files are not
                    uploaded here.
                </strong>

                <span>
                    Place optimized
                    files in{" "}
                    <code>
                        client/public/project-media/
                    </code>{" "}
                    and reference them
                    with a path such as{" "}
                    <code>
                        /project-media/example.webp
                    </code>
                    .
                </span>
            </div>


            {media.length === 0 ? (
                <div className="admin-media-empty">
                    <p>
                        No media has
                        been assigned
                        to this project.
                    </p>

                    <p>
                        The public card
                        will continue
                        using the
                        existing
                        placeholder.
                    </p>
                </div>
            ) : (
                <div className="admin-media-list">
                    {media.map(
                        (
                            item,
                            index
                        ) => (
                            <article
                                className="admin-media-item"
                                key={`${index}-${item.src || "new"}`}
                            >
                                <div className="admin-media-item-header">
                                    <div>
                                        <strong>
                                            Media{" "}
                                            {index +
                                                1}
                                        </strong>

                                        {index ===
                                            0 && (
                                                <span className="admin-media-primary-badge">
                                                    Card
                                                    preview
                                                </span>
                                            )}
                                    </div>

                                    <div className="admin-media-order-actions">
                                        <button
                                            className="button button-secondary"
                                            type="button"
                                            onClick={() =>
                                                moveMediaItem(
                                                    index,
                                                    -1
                                                )
                                            }
                                            disabled={
                                                index ===
                                                0
                                            }
                                        >
                                            ↑
                                        </button>

                                        <button
                                            className="button button-secondary"
                                            type="button"
                                            onClick={() =>
                                                moveMediaItem(
                                                    index,
                                                    1
                                                )
                                            }
                                            disabled={
                                                index ===
                                                media.length -
                                                1
                                            }
                                        >
                                            ↓
                                        </button>

                                        <button
                                            className="button button-secondary"
                                            type="button"
                                            onClick={() =>
                                                removeMediaItem(
                                                    index
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>


                                <div className="admin-editor-grid admin-editor-grid-two">
                                    <label className="form-field">
                                        <span>
                                            Media type
                                        </span>

                                        <select
                                            value={
                                                item.type ||
                                                "image"
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateMediaItem(
                                                    index,
                                                    "type",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                        >
                                            <option value="image">
                                                Image
                                            </option>

                                            <option value="video">
                                                Video
                                            </option>
                                        </select>
                                    </label>


                                    <label className="form-field">
                                        <span>
                                            Source
                                        </span>

                                        <input
                                            type="text"
                                            value={
                                                item.src ||
                                                ""
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateMediaItem(
                                                    index,
                                                    "src",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="/project-media/project-name.webp"
                                            maxLength={
                                                500
                                            }
                                        />
                                    </label>
                                </div>


                                <label className="form-field">
                                    <span>
                                        Alt text
                                    </span>

                                    <input
                                        type="text"
                                        value={
                                            item.alt ||
                                            ""
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateMediaItem(
                                                index,
                                                "alt",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Describe what is visible and useful in this media."
                                        maxLength={
                                            300
                                        }
                                    />
                                </label>


                                <label className="form-field">
                                    <span>
                                        Caption
                                        <small>
                                            Optional
                                        </small>
                                    </span>

                                    <input
                                        type="text"
                                        value={
                                            item.caption ||
                                            ""
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateMediaItem(
                                                index,
                                                "caption",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Short supporting caption"
                                        maxLength={
                                            300
                                        }
                                    />
                                </label>


                                {item.src && (
                                    <div className="admin-media-path-preview">
                                        <span>
                                            Saved
                                            reference:
                                        </span>

                                        <code>
                                            {
                                                item.src
                                            }
                                        </code>
                                    </div>
                                )}
                            </article>
                        )
                    )}
                </div>
            )}


            <button
                className="button button-secondary"
                type="button"
                onClick={
                    addMediaItem
                }
            >
                + Add Media
            </button>
        </section>
    );
}


export default AdminProjectMediaEditor;