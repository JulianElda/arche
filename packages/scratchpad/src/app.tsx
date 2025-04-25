import { Button, Card, Footer } from "lib";

function App() {
  return (
    <div className="mx-auto max-w-lg pt-16">
      <Card>
        <div className="flex flex-col space-y-4">
          <Button
            id="button"
            onClick={() => undefined}
            style="primary"
            text="Illustration"
            type="button"
          />

          <Button
            id="button-tu"
            onClick={() => undefined}
            style="secondary"
            text="Illustration"
            type="button"
          />
        </div>

        <Footer
          label="Julius Polar@GitHub"
          link="https://github.com/JulianElda/scratchpad"
        />
      </Card>
    </div>
  );
}

export default App;
