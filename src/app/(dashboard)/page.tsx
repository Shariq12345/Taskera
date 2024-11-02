import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";

// Mark the page as dynamically rendered
export const dynamic = "force-dynamic";

const Home = async () => {
  try {
    // Check if we're running on the server during build time
    const headersList = headers();
    const isServerSide = !headersList.get("user-agent");

    if (isServerSide) {
      // Return a minimal page during build time
      return <div>Loading...</div>;
    }

    const user = await getCurrent();
    if (!user) {
      redirect("/sign-in");
    }

    const workspaces = await getWorkspaces();

    if (!workspaces || workspaces.total === 0) {
      redirect("/workspaces/create");
    }

    if (workspaces.documents?.[0]?.$id) {
      redirect(`/workspaces/${workspaces.documents[0].$id}`);
    }

    // Fallback in case something unexpected happens
    return <div>Redirecting...</div>;
  } catch (error) {
    console.error("Error in Home page:", error);
    // Provide a fallback UI in case of errors
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }
};

export default Home;
