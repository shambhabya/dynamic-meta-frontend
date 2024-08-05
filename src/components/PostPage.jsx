import { useEffect, useState } from "react";
import "./postPage.css";
import axios from "axios";
import { Image, Copy, Download, Loader } from "lucide-react";

const backgrounds = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-white",
  "bg-purple-200",
];

const templates = ["template1", "template2", "template3"];

const ImageGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [background, setBackground] = useState(backgrounds[0]);
  const [template, setTemplate] = useState(templates[0]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleCreateImage = async () => {
    const params = {
      title,
      description,
      imageUrl,
      background,
      template,
    };

    const baseUrl = "http://localhost:3000/api/generate-og-image";

    const url = new URL(baseUrl);
    const queryParams = new URLSearchParams(params);

    url.search = queryParams.toString();
    setGeneratedImageUrl(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedImageUrl);
    setAlertMessage("Image URL copied to clipboard!");
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(generatedImageUrl);
      console.log(response);
      console.log(generatedImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "og-image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up by revoking the object URL
      URL.revokeObjectURL(url);
      setAlertMessage("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      setAlertMessage("Error downloading image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyMetaTag = () => {
    const metaTag = `<meta property="og:image" content="${generatedImageUrl}" />`;
    navigator.clipboard.writeText(metaTag);
    setAlertMessage("Meta tag copied to clipboard!");
  };

  const truncatedTitle =
    title.length > 100 ? title.slice(0, 100) + "..." : title;
  const truncatedDescription =
    imageUrl !== "" && description.length > 80
      ? description.slice(0, 70) + "..."
      : description;

  return (
    <div className="flex min-h-screen p-6 bg-gray-200 items-center">
      <div className="w-1/2 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Image Generator</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            maxLength={200}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Image size={18} />
            </span>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <div className="mt-1 flex space-x-2">
            {backgrounds.map((bg, index) => (
              <button
                key={index}
                className={`w-8 border h-8 rounded-full ${bg} ${
                  background === bg
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }`}
                onClick={() => setBackground(bg)}
              ></button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Template
          </label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {templates.map((temp, index) => (
              <button
                key={index}
                className={`p-2 border  ${
                  template === temp ? "ring-2 ring-indigo-500" : ""
                }`}
                onClick={() => setTemplate(temp)}
              >
                Template {index + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateImage}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Image
        </button>
      </div>

      <div className="w-1/2 p-6 flex flex-col items-center justify-center">
        <div
          className={`preview  flex ${
            template != "template2" && "flex-col"
          } items-center rounded-md  w-full ${background} ${template} xxx`}
        >
          <div className="pt-4 px-4">
            <h3 className="text-xl font-bold">
              {truncatedTitle || "Your Title Here"}
            </h3>
            <p className="mt-2">
              {truncatedDescription || "Your content will appear here"}
            </p>
          </div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="p-4 w-full h-full object-cover rounded image"
            />
          )}
        </div>

        {generatedImageUrl && (
          <div className="mt-4 space-y-4 w-full">
            <div className="flex space-x-4">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 px-4 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
              >
                <Copy size={18} className="mr-2" />
                Copy Link
              </button>
              <button
                onClick={handleDownloadImage}
                className="flex-1 py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader size={18} className="mr-2 animate-spin" />
                ) : (
                  <Download size={18} className="mr-2" />
                )}
                {isDownloading ? "Downloading..." : "Download Image"}
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Meta OG Image Tag:
              </p>
              <div className="flex items-center bg-white border rounded-md">
                <pre className="flex-grow p-2 text-sm text-gray-600 overflow-x-auto">
                  <code>{`<meta property="og:image" content="${generatedImageUrl}" />`}</code>
                </pre>
                <button
                  onClick={handleCopyMetaTag}
                  className="p-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {alertMessage && (
          <div
            className="mt-4 absolute top-0 right-3 w-1/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
