import { useSession } from "next-auth/react";

const WelcomeMessage = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to your dashboard,{" "}
        <span className="text-blue-600 uppercase">
          {session?.user?.username || "User"}
        </span>
        !
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We&apos;re glad to have you here. Your dashboard is your central hub for
        managing resources and pages efficiently.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        <strong>Get started:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>Create new resources and pages to organize your content.</li>
        <li>Access and manage all your resources from the sidebar.</li>
        <li>Click on any resource to view and edit its details.</li>
        <li>Use the context menu to quickly create or delete resources and pages.</li>
      </ul>
      <p className="text-lg text-gray-600 mb-6">
        Need help? Visit our{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline"
        >
          support page
        </a>{" "}
        or contact our support team.
      </p>
    </div>
  );
};

export default WelcomeMessage;
