import mongoose from "mongoose";

const MAX_ARRAY_ITEMS = 30;

function limitedArray(value) {
    return Array.isArray(value) && value.length <= MAX_ARRAY_ITEMS;
}

const metricSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            trim: true,
            maxlength: 60,
            required: true,
        },

        value: {
            type: String,
            trim: true,
            maxlength: 60,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const linkSchema = new mongoose.Schema(
    {
        github: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        live: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const mediaItemSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },

        src: {
            type: String,
            trim: true,
            maxlength: 1000,
            required: true,
        },

        alt: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        caption: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const productLensSchema = new mongoose.Schema(
    {
        audience: {
            type: String,
            trim: true,
            maxlength: 1200,
            default: "",
        },

        userProblem: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        approach: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        decisions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1000,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Product decisions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        outcome: {
            type: String,
            trim: true,
            maxlength: 1500,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const uxLensSchema = new mongoose.Schema(
    {
        userProblem: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        approach: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        flow: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 200,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `UX flow cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        decisions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1000,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `UX decisions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        outcome: {
            type: String,
            trim: true,
            maxlength: 1500,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const engineeringLensSchema = new mongoose.Schema(
    {
        architecture: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },

        implementation: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1000,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Engineering implementation cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        safeguards: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1000,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Engineering safeguards cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        tradeoff: {
            type: String,
            trim: true,
            maxlength: 1500,
            default: "",
        },

        outcome: {
            type: String,
            trim: true,
            maxlength: 1500,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const lensEvidenceSchema = new mongoose.Schema(
    {
        product: {
            type: productLensSchema,
            default: () => ({}),
        },

        ux: {
            type: uxLensSchema,
            default: () => ({}),
        },

        engineering: {
            type: engineeringLensSchema,
            default: () => ({}),
        },
    },
    {
        _id: false,
    }
);

const productFiltersSchema = new mongoose.Schema(
    {
        practices: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Product practices cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        contexts: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Product contexts cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },
    },
    {
        _id: false,
    }
);

const uxFiltersSchema = new mongoose.Schema(
    {
        methods: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `UX methods cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        interactions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `UX interactions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },
    },
    {
        _id: false,
    }
);

const engineeringFiltersSchema = new mongoose.Schema(
    {
        languagesFrameworks: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Languages and frameworks cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        systemsInfrastructure: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Systems and infrastructure cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },
    },
    {
        _id: false,
    }
);

const filterFacetsSchema = new mongoose.Schema(
    {
        product: {
            type: productFiltersSchema,
            default: () => ({}),
        },

        ux: {
            type: uxFiltersSchema,
            default: () => ({}),
        },

        engineering: {
            type: engineeringFiltersSchema,
            default: () => ({}),
        },
    },
    {
        _id: false,
    }
);

const caseStudySchema = new mongoose.Schema(
    {
        context: {
            type: String,
            trim: true,
            maxlength: 4000,
            default: "",
        },

        userNeed: {
            type: String,
            trim: true,
            maxlength: 3000,
            default: "",
        },

        constraints: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Constraints cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        productDecisions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Product decisions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        designDecisions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Design decisions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        engineeringDecisions: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Engineering decisions cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        tradeoffs: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Tradeoffs cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        nextSteps: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1500,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Next steps cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },
    },
    {
        _id: false,
    }
);

const projectContentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlength: 140,
            required: true,
        },

        subtitle: {
            type: String,
            trim: true,
            maxlength: 240,
            default: "",
        },

        type: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },

        displayType: {
            type: String,
            enum: [
                "case-study",
                "experience",
                "project",
                "leadership",
            ],
            default: "project",
        },

        status: {
            type: String,
            trim: true,
            maxlength: 60,
            default: "",
        },

        featured: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },

        audience: {
            type: String,
            trim: true,
            maxlength: 1200,
            default: "",
        },

        location: {
            type: String,
            trim: true,
            maxlength: 160,
            default: "",
        },

        date: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },

        sortDate: {
            type: Date,
            default: null,
        },

        order: {
            type: Number,
            min: 0,
            max: 10000,
            default: 0,
        },

        summary: {
            type: String,
            trim: true,
            maxlength: 1200,
            default: "",
        },

        shortValue: {
            type: String,
            trim: true,
            maxlength: 700,
            default: "",
        },

        problem: {
            type: String,
            trim: true,
            maxlength: 4000,
            default: "",
        },

        solution: {
            type: String,
            trim: true,
            maxlength: 4000,
            default: "",
        },

        impact: {
            type: String,
            trim: true,
            maxlength: 2500,
            default: "",
        },

        cardOutcome: {
            type: String,
            trim: true,
            maxlength: 900,
            default: "",
        },

        roleLens: {
            type: [
                {
                    type: String,
                    enum: [
                        "product",
                        "ux-ui",
                        "engineering",
                    ],
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Role lenses cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        proofPoints: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 1200,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Proof points cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        impactStats: {
            type: [metricSchema],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Impact stats cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        tools: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Tools cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        skills: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Skills cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        cardTags: {
            type: [
                {
                    type: String,
                    trim: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Card tags cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        searchableTags: {
            type: [
                {
                    type: String,
                    trim: true,
                    lowercase: true,
                    maxlength: 100,
                },
            ],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Searchable tags cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        detailCta: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "View Project",
        },

        lensEvidence: {
            type: lensEvidenceSchema,
            default: () => ({}),
        },

        filterFacets: {
            type: filterFacetsSchema,
            default: () => ({}),
        },

        caseStudy: {
            type: caseStudySchema,
            default: () => ({}),
        },

        media: {
            type: [mediaItemSchema],
            default: [],
            validate: {
                validator: limitedArray,
                message: `Media cannot contain more than ${MAX_ARRAY_ITEMS} items.`,
            },
        },

        links: {
            type: linkSchema,
            default: () => ({}),
        },
    },
    {
        _id: false,
    }
);

const projectSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 140,
            match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        },

        draft: {
            type: projectContentSchema,
            required: true,
        },

        published: {
            type: projectContentSchema,
            default: undefined,
        },

        publicationStatus: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
            index: true,
        },

        isArchived: {
            type: Boolean,
            default: false,
            index: true,
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        revision: {
            type: Number,
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.index({
    publicationStatus: 1,
    isArchived: 1,
    "published.order": 1,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;