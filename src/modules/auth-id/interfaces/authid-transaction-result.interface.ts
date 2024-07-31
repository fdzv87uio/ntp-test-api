export interface VerificationSteps {
    DocumentParsed: boolean;
    EmrtdParsedFields: boolean; // Replace `any` with the appropriate type if known
    DocumentVerified: boolean;
    EmrtdVerificationDetails: boolean; // Replace `any` with the appropriate type if known
    BiometryProcessed: boolean;
    BiometryMatched: boolean;
    LivenessDetectionPerformed: boolean;
  }
  
  export interface PayloadData {
    VerificationSteps: VerificationSteps;
  }
  
  export interface Payload {
    Data: PayloadData;
  }
  
  export interface AuthidResultResponse {
    Name: string;
    OperationId: string;
    Payload: Payload;
  }