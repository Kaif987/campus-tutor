import User from "@/models/user"; // Adjust the path as necessary

export async function updateProgress(userId, courseId, videoId, status) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const course = user.courses.find(course => course.courseId === courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const video = course.videos.find(video => video.videoId === videoId);
        if (!video) {
            throw new Error("Video not found");
        }

        // Mark the video as watched
        video.watched = status;

        // Calculate the progress
        const watchedVideos = course.videos.filter(video => video.watched).length;
        course.progress = Math.round((watchedVideos / course.videos.length) * 100);

        // Save the user
        await user.save();

        return course.progress;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
