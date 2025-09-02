import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <Navbar />
      <Card>
        <h2 className="text-lg font-bold">Welcome to Home</h2>
        <p>This is inside a Card component.</p>
        <Button text="Click Me" onClick={() => alert("Button clicked!")} />
      </Card>
    </div>
  );
}
