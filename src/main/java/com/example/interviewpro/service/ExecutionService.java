package com.example.interviewpro.service;

import org.springframework.stereotype.Service;
import java.io.*;

@Service
public class ExecutionService {

    public String execute(String userCode, String input) throws Exception {

        File tempDir = new File("temp");
        tempDir.mkdirs();

        File javaFile = new File(tempDir, "Main.java");

        try (FileWriter writer = new FileWriter(javaFile)) {
            writer.write(userCode);
        }

        // Compile
        Process compile = Runtime.getRuntime()
                .exec("javac Main.java", null, tempDir);

        compile.waitFor();

        BufferedReader compileError =
                new BufferedReader(new InputStreamReader(compile.getErrorStream()));

        StringBuilder compileErrorOutput = new StringBuilder();
        String line;

        while ((line = compileError.readLine()) != null) {
            compileErrorOutput.append(line);
        }

        if (compileErrorOutput.length() > 0) {
            throw new RuntimeException("Compilation Error:\n" + compileErrorOutput);
        }

        // Run
        Process run = Runtime.getRuntime()
                .exec("java Main", null, tempDir);

        // Send input
        OutputStream os = run.getOutputStream();
        os.write(input.getBytes());
        os.flush();
        os.close();

        // Timeout protection
        boolean finished = run.waitFor(5, java.util.concurrent.TimeUnit.SECONDS);

        if (!finished) {
            run.destroyForcibly();
            throw new RuntimeException("Time Limit Exceeded");
        }

        // Read output
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(run.getInputStream()));

        StringBuilder output = new StringBuilder();

        while ((line = reader.readLine()) != null) {
            output.append(line);
        }

        return output.toString();
    }
}