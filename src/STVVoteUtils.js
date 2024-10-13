export const validatePreferences = (preferences, totalCandidates) => {
    if (!preferences || preferences.length === 0) {
        throw new Error("Preferences cannot be empty.");
    }
    for (let i = 0; i < preferences.length; i++) {
        if (preferences[i] < 0 || preferences[i] >= totalCandidates) {
            throw new Error("Invalid candidate index.");
        }
    }
};

export const formatCandidates = (candidates) => {
    return candidates.map((candidate, index) => ({
        id: index,
        name: candidate
    }));
};