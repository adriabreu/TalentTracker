# Diagrama de Entidades - TalentTracker

## 📊 Visão Geral do Sistema

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│   Users    │     │ Candidates │     │JobPostings │
├────────────┤     ├────────────┤     ├────────────┤
│ id         │┐    │ id         │┐    │ id         │┐
│ email      ││    │ userId     │┼────┤ title      ││
│ password   ││    │ firstName  ││    │ description││
│ firstName  ││    │ lastName   ││    │ requirements│
│ lastName   ││    │ bio        ││    │ status     ││
│ role       │┼────┤ skills     ││    │ location   ││
│ active     ││    │ experience ││    │ salary     ││
│ lastLoginAt││    │ education  ││    │ createdById││
│ createdAt  ││    │ location   ││    │ companyId  │┼───┐
│ updatedAt  ││    │ contactInfo││    │ createdAt  ││   │
└────────────┘│    │ documents  ││    │ updatedAt  ││   │
 └────────────┘    │ createdAt  ││    │ closedAt   ││   │
                   │ updatedAt  ││    └────────────┘│   │
                   └────────────┘│     └────────────┘   │
                    └────────────┘                      │
                         │                              │
                         │                              │
                         ▼                              │
              ┌────────────────────┐          ┌─────────┴──────┐
              │   Applications     │          │   Companies    │
              ├────────────────────┤          ├────────────────┤
              │ id                 │          │ id             │
              │ candidateId        │◄─────────┤ name           │
              │ jobPostingId       │          │ description    │
              │ status             │          │ industry       │
              │ coverLetter        │          │ location       │
              │ resume             │          │ website        │
              │ applicationDate    │          │ contactEmail   │
              │ recruiterNotes     │          │ logo           │
              │ interviewDate      │          │ createdAt      │
              │ rating             │          │ updatedAt      │
              │ feedback           │          └────────────────┘
              │ rejectionReason    │
              │ hireDate           │
              │ createdAt          │
              │ updatedAt          │
              └────────────────────┘
```

## 🔄 Relacionamentos

1. **Users → Candidates** (1:0..1)
   - Um usuário pode ter no máximo um perfil de candidato
   - Um candidato está associado a exatamente um usuário

2. **JobPostings → Companies** (N:1)
   - Uma empresa pode ter múltiplas vagas
   - Cada vaga pertence a uma única empresa

3. **Applications → Candidates** (N:1)
   - Um candidato pode ter múltiplas candidaturas
   - Cada candidatura está associada a um único candidato

4. **Applications → JobPostings** (N:1)
   - Uma vaga pode receber múltiplas candidaturas
   - Cada candidatura está associada a uma única vaga

## 🔑 Enumerações

### UserRole
- `ADMIN`: Administrador do sistema
- `RECRUITER`: Recrutador
- `MANAGER`: Gerente de contratação
- `CANDIDATE`: Candidato

### JobStatus
- `DRAFT`: Em rascunho (não publicada)
- `OPEN`: Aberta para candidaturas
- `CLOSED`: Fechada para candidaturas
- `FILLED`: Preenchida (contratação realizada)

### ApplicationStatus
- `APPLIED`: Candidatura recebida
- `SCREENING`: Em triagem inicial
- `INTERVIEW`: Em fase de entrevista
- `TECHNICAL_TEST`: Em fase de teste técnico
- `OFFER`: Proposta enviada
- `HIRED`: Contratado
- `REJECTED`: Rejeitado
- `WITHDRAWN`: Candidatura retirada pelo candidato

## 📋 Detalhamento das Entidades

### Users
Armazena informações dos usuários do sistema, com diferentes níveis de acesso.

### Candidates
Armazena informações detalhadas dos candidatos, associado a um usuário.

### Companies
Empresas cadastradas no sistema que podem publicar vagas.

### JobPostings
Vagas publicadas pelas empresas, com todos os detalhes necessários.

### Applications
Registra candidaturas de candidatos às vagas, com todo o processo de recrutamento.

## 🔒 Políticas de Acesso

- **Admin**: Acesso total a todas as entidades
- **Recruiter**: Acesso para criar e gerenciar vagas e avaliar candidaturas
- **Manager**: Acesso para visualizar vagas e candidaturas, aprovar contratações
- **Candidate**: Acesso para visualizar vagas abertas e gerenciar suas próprias candidaturas
