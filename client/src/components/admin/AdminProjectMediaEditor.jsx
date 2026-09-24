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
                    itemIndex === index
                        ? {
                            ...item,
                            [field]:
                                fieldValue,
                        }
                        : item
            );

        onChange(nextMedia);
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
                    itemIndex !== index
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

        onChange(nextMedia);
    }


    return (
        <div className="admin-media-editor">
            <div className="admin-media-help">
                <strong>
                    Media files live in
                    your public project
                    media folder.
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

                <span>
                    The first valid media
                    item becomes the
                    project card preview.
                </span>
            </div>


            {media.length === 0 ? (
                <div className="admin-media-empty">
                    <div
                        className="admin-media-empty-mark"
                        aria-hidden="true"
                    >
                        +
                    </div>

                    <div>
                        <strong>
                            No project media yet
                        </strong>

                        <p>
                            Add a screenshot,
                            product visual,
                            diagram, or video.
                            Until then, the
                            public project card
                            will use its
                            placeholder.
                        </p>
                    </div>
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
                                    <div className="admin-media-item-title">
                                        <span className="admin-media-number">
                                            {String(
                                                index +
                                                1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <div>
                                            <strong>
                                                Media{" "}
                                                {index +
                                                    1}
                                            </strong>

                                            <span>
                                                {item.type ===
                                                    "video"
                                                    ? "Video"
                                                    : "Image"}
                                            </span>
                                        </div>

                                        {index ===
                                            0 && (
                                                <span className="admin-media-primary-badge">
                                                    Primary media
                                                </span>
                                            )}
                                    </div>

                                    <div className="admin-media-order-actions">
                                        <button
                                            className="button button-secondary"
                                            type="button"
                                            aria-label={`Move media ${index + 1} up`}
                                            title="Move up"
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
                                            aria-label={`Move media ${index + 1} down`}
                                            title="Move down"
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
                                            className="button button-secondary admin-media-remove"
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


                                <div className="admin-media-item-layout">
                                    <div className="admin-media-preview">
                                        {item.src ? (
                                            item.type ===
                                                "video" ? (
                                                <video
                                                    src={
                                                        item.src
                                                    }
                                                    controls
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <img
                                                    src={
                                                        item.src
                                                    }
                                                    alt={
                                                        item.alt ||
                                                        ""
                                                    }
                                                    loading="lazy"
                                                />
                                            )
                                        ) : (
                                            <div className="admin-media-preview-empty">
                                                <span>
                                                    Preview
                                                </span>

                                                <strong>
                                                    Add a
                                                    source
                                                    path
                                                </strong>
                                            </div>
                                        )}

                                        {index ===
                                            0 && (
                                                <span className="admin-media-preview-label">
                                                    Work card
                                                    preview
                                                </span>
                                            )}
                                    </div>


                                    <div className="admin-media-fields">
                                        <div className="admin-editor-grid admin-editor-grid-two">
                                            <label className="form-field">
                                                <span>
                                                    Media
                                                    type
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

                                            <small>
                                                Describe
                                                the useful
                                                visual
                                                content,
                                                not just
                                                the file
                                                name.
                                            </small>
                                        </label>


                                        <label className="form-field">
                                            <span>
                                                Caption{" "}
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
                                                placeholder="Short supporting context for this visual"
                                                maxLength={
                                                    300
                                                }
                                            />
                                        </label>


                                        {item.src && (
                                            <div className="admin-media-path-preview">
                                                <span>
                                                    Saved
                                                    reference
                                                </span>

                                                <code>
                                                    {
                                                        item.src
                                                    }
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </div>
            )}


            <button
                className="button button-secondary admin-media-add"
                type="button"
                onClick={
                    addMediaItem
                }
            >
                + Add Media
            </button>
        </div>
    );
}


export default AdminProjectMediaEditor;