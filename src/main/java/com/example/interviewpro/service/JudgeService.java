package com.example.interviewpro.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.List;

@Service
public class JudgeService {

    private static final String TEMP_DIR = "temp_codes/";

    public String judge(String code, List<String> inputs, List<String> expectedOutputs) throws Exception {

        Files.createDirectories(Paths.get(TEMP_DIR));

        String fileName = "Solution.cpp";
        Path sourcePath = Paths.get(TEMP_DIR + fileName);

        // 1️⃣ Write code to file
        Files.writeString(sourcePath, code);

        // 2️⃣ Compile
        Process compile = new ProcessBuilder(
                "g++",
                sourcePath.toAbsolutePath().toString(),
                "-o",
                TEMP_DIR + "Solution.exe"
        ).start();

        compile.waitFor();

        if (compile.exitValue() != 0) {
            return "Compilation Error";
        }

        // 3️⃣ Run test cases
        for (int i = 0; i < inputs.size(); i++) {

            Process run = new ProcessBuilder(
                    TEMP_DIR + "Solution.exe"
            ).start();

            // Pass input
            BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(run.getOutputStream())
            );
            writer.write(inputs.get(i));
            writer.newLine();
            writer.flush();
            writer.close();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(run.getInputStream())
            );

            String output = reader.readLine();
            run.waitFor();

            if (!expectedOutputs.get(i).trim().equals(output.trim())) {
                return "Failed at Test Case " + (i + 1)
                        + "\nExpected: " + expectedOutputs.get(i)
                        + "\nGot: " + output;
            }
        }

        return "Accepted";
    }
}
