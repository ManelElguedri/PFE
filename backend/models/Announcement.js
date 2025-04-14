const announcementSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
    time: String,
    duration: String,
    children: String,
    city: String,
    availability: [String],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Announcement", announcementSchema);
