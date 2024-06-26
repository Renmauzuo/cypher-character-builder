const types = {
    adept: {
        pool: {
            might: 7,
            speed: 9,
            intellect: 12
        }
    },
    explorer: {
        pool: {
            might: 10,
            speed: 9,
            intellect: 9
        }
    },
    speaker: {
        pool: {
            might: 8,
            speed: 9,
            intellect: 11
        }
    },
    warrior: {
        pool: {
            might: 10,
            speed: 10,
            intellect: 8
        }
    }
};

const descriptors = {
    appealing: {
        pool: {
            intellect: 2
        },
        skills: [
            "Pleasant social interactions",
            "Resisting any kind of seduction or persuasion if you wish it"
        ]
    },
    benificient: {
        inabilities: [
            "While you are alone, all Intellect and Speed tasks are hindered."
        ],
        skills: [
            "All tasks related to pleasant social interaction, putting other people at ease, and gaining trust."
        ],
        traits: [
            {
                name: "Altruistic",
                description: "If you’re standing next to a creature that takes damage, you can intercede and take 1 point of that damage yourself (reducing the damage inflicted on the creature by 1 point). If you have Armor, it does not provide a benefit when you use this ability"
            },
            {
                name: "Helpful",
                description: "Whenever you help another character, that character gains the benefit as if you were trained even if you are not trained or specialized in the attempted task."
            },
            {
                name: "Generous",
                description: "Allies who have spent the last day with you add +1 to their recovery rolls."
            }
        ]
    },
    /*brash: {
        pool: {
            speed: 2
        }
    },
    calm: {
        pool: {
            intellect: 2
        }
    },
    chaotic: {
        pool: {
            speed: 4
        }
    },
    charming: {
        pool: {
            intellect: 2
        }
    },
    clever: {
        pool: {
            intellect: 2
        }
    },
    clumsy: {
        pool: {
            speed: -2,
            might: 2
        }
    },
    craven: {
        pool: {
            speed: 2
        }
    },
    creative: {
        pool: {
            intellect: 2
        }
    },
    cruel: {
        pool: {
            intellect: 2
        }
    },
    dishonorable: {
        pool: {
            speed: 4
        }
    },
    doomed: {
        pool: {
            speed: 2
        }
    },
    empathic: {
        pool: {
            intellect: 4
        }
    },
    exiled: {
        pool: {
            might: 2
        }
    },
    fast: {
        pool: {
            speed: 2
        }
    },
    foolish: {
        pool: {
            intellect: -4
        }
    },
    graceful: {
        pool: {
            speed: 2
        }
    },
    guarded: {
        pool: {
            intellect: 2
        }
    },
    hardy: {
        pool: {
            might: 4
        }
    },
    hideous: {
        bonusPoints: 4
    },
    honorable: {
        pool: {
            might: 2
        }
    },
    impulsive: {
        pool: {
            speed: 2
        }
    },
    inquisitive: {
        pool: {
            intellect: 4
        }
    },
    intelligent: {
        pool: {
            intellect: 2
        }
    },
    intuitive: {
        pool: {
            intellect: 2
        }
    },
    jovial: {
        pool: {
            intellect: 2
        }
    },
    kind: {
        pool: {
            intellect: 2
        }
    },
    learned: {
        pool: {
            intellect: 2
        }
    },
    lucky: {
        pool: {
            luck: 3
        }
    },
    mad: {
        pool: {
            intellect: 4
        }
    },
    mechanical: {
        pool: {
            intellect: 2
        }
    },
    mysterious: {},
    mystical: {
        pool: {
            intellect: 2
        }
    },
    naive: {},
    perceptive: {
        pool: {
            intellect: 2
        }
    },
    resilient: {
        pool: {
            intellect: 2,
            might: 2
        }
    },
    riskTaking: {
        name: "Risk-Taking",
        pool: {
            speed: 4
        }
    },
    rugged: {},
    sharpEyed: {
        name: "Sharp-Eyed"
    },
    skeptical: {
        pool: {
            intellect: 2
        }
    },
    stealthy: {
        pool: {
            speed: 2
        }
    },
    strong: {
        pool: {
            might: 4
        }
    },
    strongWilled: {
        name: "Strong-Willed",
        pool: {
            intellect: 4
        }
    },
    swift: {
        pool: {
            speed: 4
        }
    },
    tongueTied: {
        name: "Tongue-Tied",
        pool: {
            might: 2,
            speed: 2
        }
    },
    tough: {},
    vicious: {},
    virtuous: {
        pool: {
            might: 2
        }
    },
    weird: {
        pool: {
            intellect: 2
        }
    },*/
};